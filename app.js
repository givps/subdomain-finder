const form = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');
const tbody = document.getElementById('resultsBody');
const filterInput = document.getElementById('filterInput');
const logoBtn = document.getElementById('logoBtn');

let allRows = [];

logoBtn.addEventListener('click', () => window.location.reload());

form.addEventListener('submit', async e => {
  e.preventDefault();
  const domain = document.getElementById('domain').value.trim();
  resultsSection.style.display = 'block';
  tbody.innerHTML = `<tr><td colspan="2">Searching…</td></tr>`;
  allRows = [];

  try {
    const res = await fetch(`https://crt.sh/?q=%25.${domain}&output=json`);
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();

    // Unique + sort A–Z
    const subs = [...new Set(data.map(d => d.name_value))]
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    tbody.innerHTML = `<tr><td colspan="2">Checking status…</td></tr>`;
    allRows = [];

    for (const s of subs) {
      const row = { name: s, status: "Checking…" };
      allRows.push(row);
      render();

      try {
        await fetch(`https://${s}`, { method: "HEAD", mode: "no-cors" });
        row.status = "Active";
      } catch {
        row.status = "Inactive";
      }
      render();
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="2" style="color:#b00020;">Error: ${err.message}</td></tr>`;
  }
});

filterInput.addEventListener('input', render);

function render() {
  const term = filterInput.value.toLowerCase();
  tbody.innerHTML = "";

  const filtered = allRows.filter(r => r.name.toLowerCase().includes(term));
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="2">No results</td></tr>`;
    return;
  }

  filtered
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    .forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.name}</td>
        <td class="status ${r.status === 'Active' ? 'active' :
                            r.status === 'Inactive' ? 'inactive' : ''}">
          ${r.status}
        </td>`;
      tbody.appendChild(tr);
    });
}

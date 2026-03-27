import { formatLabel } from "../../lib/utils";
import EmptyState from "../ui/EmptyState";

const tabs = [
  { key: "info", label: "Info" },
  { key: "owner", label: "Owner" },
  { key: "registration", label: "Registration" },
  { key: "insurance", label: "Insurance" },
];

function renderEntries(data) {
  const entries = Object.entries(data || {});

  if (!entries.length) {
    return <EmptyState title="No segment data" message="The selected section did not return any fields." />;
  }

  return (
    <div className="detail-grid">
      {entries.map(([key, value]) => (
        <article key={key} className="detail-item">
          <span>{formatLabel(key)}</span>
          <strong>{String(value ?? "N/A")}</strong>
        </article>
      ))}
    </div>
  );
}

function DetailTabs({ activeTab, onChange, data, loading }) {
  return (
    <div className="tabs-card">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeTab === tab.key ? "tab-active" : "tab"}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">{loading ? <div className="state-card">Loading {activeTab}...</div> : renderEntries(data)}</div>
    </div>
  );
}

export default DetailTabs;

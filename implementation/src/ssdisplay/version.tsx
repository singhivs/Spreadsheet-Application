import React from "react";

export default function VersionHistoryDetails(version: any) {
  return (
    <div className="version-history-details">
      <div className="version-date">{version.date}</div>
      <div className="version-description">{version.description}</div>
    </div>
  );
}

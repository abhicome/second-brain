# Replication Monitoring - Knowledge Index

## Purpose
Central index for the AD Replication Monitoring knowledge package.

## Available Files

### Core Scripts
- `00_Run-All.ps1`
  - Main orchestrator script.
  - Runs all monitoring stages sequentially.

- `01_Index-DCFiles.ps1`
  - Enumerates replication report CSVs.
  - Validates DC file availability.
  - Generates DC file inventory.

- `02_Merge-Reporting.ps1`
  - Merges all replication CSV reports.
  - Normalizes DC naming.
  - Consolidates replication data.

- `03_Generate-Dashboard_v2.ps1`
  - Generates HTML dashboard.
  - Builds health metrics and summaries.
  - Creates replication visualization.

- `04_Generate-Diagrams.ps1`
  - Generates topology and dependency diagrams.

## Dashboard Files
- `ADReplicationDashboard_v2_2.html`
- `ADReplicationDashboard_v2_3.html`

Purpose:
- Interactive dashboard visualization.
- Replication failure tracking.
- Replication queue visibility.
- Site/DC summaries.

## Data Files
- `DC_FileStatus.csv`
  - Tracks expected DC report files.
  - Validates collection coverage.

- `Merged_Repl.csv`
  - Consolidated replication dataset.

- `_state/FailuresSnapshot.csv`
  - Historical replication failure tracking.
  - Trend comparison source.

## Operational Flow
1. Collect replication reports from all DCs.
2. Validate report availability.
3. Merge CSV datasets.
4. Generate dashboard and diagrams.
5. Store state snapshots for trending.

## Key Design Decisions
- File-based ingestion model.
- CSV normalization layer.
- Dashboard generation without external dependencies.
- Historical failure state tracking.
- Modular execution model.

## Dependencies
- PowerShell
- RSAT ActiveDirectory module
- HTML-compatible browser

## Suggested Improvements
- Add scheduled execution.
- Add alerting integration.
- Add replication latency thresholds.
- Export metrics to monitoring tools.
- Add central configuration file.

## Repository Path
`knowledge/AD/Replication-Monitoring/`

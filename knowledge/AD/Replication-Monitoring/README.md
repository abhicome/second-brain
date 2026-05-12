# AD Replication Monitoring

This knowledge package contains a modular Active Directory replication monitoring and dashboard solution.

## Components
- PowerShell orchestration scripts
- Replication CSV merge logic
- Dashboard HTML generation
- Diagram generation
- State tracking for failures and trends

## Run Order
1. `01_Index-DCFiles.ps1`
2. `02_Merge-Reporting.ps1`
3. `03_Generate-Dashboard_v2.ps1`

Or run:
- `00_Run-All.ps1`

## Outputs
- `DC_FileStatus.csv`
- `Merged_Repl.csv`
- `_state/FailuresSnapshot.csv`
- `ADReplicationDashboard_v2.html`

## Input Requirements
Replication CSV files are expected in:
`E:\Windows\SYSVOL\sysvol\CORP.AD\scripts\Do Not Delete\Replication`

Supported file names:
- `ReplReport_<DC>.csv`
- `<DC>.csv`

## Notes
- DC names are normalized.
- Site mapping uses `Get-ADDomainController` where RSAT AD module is available.
- Includes trend tracking and dashboard visualization.

## Files Included
- 00_Run-All.ps1
- 01_Index-DCFiles.ps1
- 02_Merge-Reporting.ps1
- 03_Generate-Dashboard_v2.ps1
- 04_Generate-Diagrams.ps1
- ADReplicationDashboard_v2_2.html
- ADReplicationDashboard_v2_3.html
- DC_FileStatus.csv
- Merged_Repl.csv
- _state/FailuresSnapshot.csv

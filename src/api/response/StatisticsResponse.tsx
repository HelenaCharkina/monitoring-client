export default class Statistics {
    id: string;
    agent_id: string;
    datetime: Date;
    vm_total: number;
    vm_free: number;
    vm_used_percent: number;
    disk_total: number;
    disk_free: number;
    disk_used: number;
    disk_used_percent: number;
    cpu_percentage: number;
    host_procs: number;
    format_datetime: string;
    format_vm_used_percent: number;
    format_cpu_percentage: number;
    platform_version: string;
    platform: string;
    os: string;
    model: string;
    cores: number;
}

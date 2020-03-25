// 定义监控点字段
export interface Task {
    channelId: string;
    indexCode: string;
    nameStr: string;
    rulesParamList: object[];
    taskName: string;
}
export interface FormItemListProps {
    label: string;
    placeholder?: string;
    required: boolean;
    options?: object[];
    type?: string;
    show?: boolean;
}

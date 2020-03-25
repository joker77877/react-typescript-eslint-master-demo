import React, { useState, useEffect } from 'react';
import { Table, Divider, Popconfirm, Icon, message } from 'antd';
import MyIcon from 'components/icon';
import Pagination from 'components/pagination';
import commmonApi from 'api/common';
import AddCamera from './addCamera';

import { Task, FormItemListProps } from './interface';
import './styles/index.css';

const { Column } = Table;
const { addTask, getTaskList, deleteTask, updateTask } = commmonApi;
const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<Camera[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [visible, setVisible] = useState<object>(false);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalType, setModalType] = useState<string>('add');
    const [updateParams, setUpdateParams] = useState<object>({});
    const [formItemList, setFormItemList] = useState<FormItemListProps>({
        taskName: { label: '任务名称', placeholder: '请输入任务名称', required: true, initialValue: '' }
    });
    // 关闭modal
    const handleCloseModal = (): void => {
        setVisible(false);
    };
    // 获取表格信息
    const getTabelData = (pageNo = currentPage, myPageSize = pageSize) => {
        setLoading(true);
        getTaskList({ pageSize: myPageSize, pageNo })
            .then(({ data }) => {
                setLoading(false);
                setDataSource(data.records);
                setTotal(data.total);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    // 改变页数
    const onPageChange = pageNo => {
        setCurrentPage(pageNo);
        getTabelData(pageNo);
    };
    // 改变每页显示条数
    const onShowSizeChange = (pageNo, myPageSize) => {
        setCurrentPage(pageNo);
        setPageSize(myPageSize);
        getTabelData(pageNo, myPageSize);
    };
    // 向localStorage添加一条数据
    const handleAddTask = (value: Camera): void => {
        if (modalType === 'add') {
            addTask(value).then(() => {
                handleCloseModal();
                message.success('新增任务成功！');
                getTabelData();
            });
        } else {
            updateTask(value).then(() => {
                handleCloseModal();
                message.success('修改任务成功！');
                getTabelData();
            });
        }
    };
    // 点击新增按钮
    const handleClickAddTask = (): void => {
        const newFormItemList = { ...formItemList };
        newFormItemList.taskName.initialValue = '';
        setFormItemList(newFormItemList);
        setUpdateParams({});
        setModalType('add');
        setVisible(true);
    };
    // 删除二次确认
    const confirm = id => {
        deleteTask(id).then(() => {
            message.success('删除任务成功！');
            getTabelData();
        });
    };
    // 修改任务
    const editTask = params => {
        const newFormItemList = { ...formItemList };
        newFormItemList.taskName.initialValue = params.taskName;
        setUpdateParams(params);
        setFormItemList(newFormItemList);
        setModalType('edit');
        setVisible(true);
    };
    useEffect(() => {
        getTabelData();
    }, []);
    return (
        <div className="home">
            <div className="home-body">
                <div className="home-body-btn">
                    <div className="home-body-btn-add" onClick={handleClickAddTask}>
                        <MyIcon type="lidaicon-h-add"></MyIcon>
                        <span className="home-body-btn-text">新增</span>
                    </div>
                </div>
                <div className="home-body-table">
                    {/* <CameraTable rowKey="algorithmID" columns={columns} loading={loading} dataSource={dataSource} pagination={false} /> */}
                    <Table<Task> rowKey="id" dataSource={dataSource} pagination={false} loading={loading}>
                        <Column title="序号" key="id" render={(text, record, index) => <span>{index + 1}</span>} />
                        <Column<Task> key="taskName" title="任务名称" dataIndex="taskName" />
                        <Column<Task> key="channelId" title="通道号信息" dataIndex="channelId" />
                        <Column<Task> key="nameStr" title="设备名称" dataIndex="nameStr" />
                        <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <a
                                        onClick={() => {
                                            editTask(record);
                                        }}
                                    >
                                        修改
                                    </a>
                                    <Divider type="vertical" />
                                    <Popconfirm
                                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                        placement="right"
                                        title={'确认删除该任务吗？'}
                                        onConfirm={() => {
                                            confirm(record.id);
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                            )}
                        />
                    </Table>
                </div>

                <div className="home-body-pagination">
                    <Pagination
                        total={total}
                        current={currentPage}
                        pageSize={pageSize}
                        showSizeChanger
                        showQuickJumper
                        onChange={onPageChange}
                        onShowSizeChange={onShowSizeChange}
                    ></Pagination>
                </div>
            </div>

            <AddCamera
                title={modalType === 'add' ? '新增任务' : '编辑任务'}
                formItemList={formItemList}
                modalType={modalType}
                visible={visible}
                updateParams={updateParams}
                handleCloseModal={handleCloseModal}
                handleAddTask={handleAddTask}
            ></AddCamera>
        </div>
    );
};
export default Home;

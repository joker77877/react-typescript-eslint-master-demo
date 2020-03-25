import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, DatePicker, Select, Slider, Icon, Button, Cascader } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import commmonApi from 'api/common';
import moment from 'moment';
import { Camera } from '../interface';
import TimeSelecter from './TimeSelecter';
import TreeSelector from '../selectPoint';
import './styles';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
// import './index.css';
const { getAlgorithm } = commmonApi;

interface CameraFormProps {
    visible: boolean;
    title: string;
    handleCloseModal: () => void;
    handleAddTask: (value: Camera) => void;
}
interface UserFormProps extends FormComponentProps {
    taskName: string;
    indexCode: string;
}
let id = 0;
const ruleTimeId = { 0: 0 };
const AddCameraModal = (props: CameraFormProps) => {
    const { visible, handleCloseModal, handleAddTask, form, title, modalType, updateParams, formItemList } = props;
    const { rulesParamList } = updateParams;
    const { getFieldDecorator, validateFields, resetFields, getFieldValue, setFieldsValue } = form;

    const [ruleOptions, setRuleOptions] = useState<object[]>([]);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 19 }
        }
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 19, offset: 5 }
        }
    };
    // 删除规则选择
    const remove = ruleId => {
        const Mykeys = getFieldValue('keys');
        if (Mykeys.length === 1) {
            return;
        }

        setFieldsValue({
            keys: Mykeys.filter(item => item.ruleId !== ruleId)
        });
    };
    // 删除时间选择
    const timeRuleRemove = (ruleIndex, myRuleTimeId) => {
        const Mykeys = getFieldValue('keys');
        if (Mykeys[ruleIndex].timeRuleList.length === 1) {
            return;
        }
        Mykeys[ruleIndex].timeRuleList = Mykeys[ruleIndex].timeRuleList.filter(item => item !== myRuleTimeId);
        setFieldsValue({
            keys: Mykeys
        });
    };
    // 新增规则选择
    const add = () => {
        const Mykeys = getFieldValue('keys');
        id += 1;
        ruleTimeId[id] = 0;
        const nextKeys = [...Mykeys, { ruleId: id, timeRuleList: [0] }];
        form.setFieldsValue({
            keys: nextKeys
        });
    };
    // 增加时间段
    const timeRuleAdd = ruleIndex => {
        const Mykeys = getFieldValue('keys');
        Mykeys[ruleIndex].timeRuleList = [...Mykeys[ruleIndex].timeRuleList, (ruleTimeId[ruleIndex] += 1)];
        form.setFieldsValue({
            keys: Mykeys
        });
    };
    if (modalType === 'add') {
        getFieldDecorator('keys', { initialValue: [{ ruleId: 0, timeRuleList: [0] }] });
    } else {
        const initialValue = [];
        id += rulesParamList.length - 1;

        rulesParamList.forEach(({ commonParams }, index) => {
            const obj = { ruleId: index, timeRuleList: [] };

            commonParams.timeList.forEach((item, i) => {
                obj.timeRuleList.push(i);
                ruleTimeId[index] = commonParams.timeList.length - 1;
            });
            initialValue.push(obj);
        });
        getFieldDecorator('keys', { initialValue });
    }

    const keys = getFieldValue('keys');
    // 时间选择验证
    const timeValidator = (rule, value, callback) => {
        if (value.weekDayValue && value.startTime && value.endTime) {
            callback();
            return;
        }
        callback('请选择时间段');
    };
    // 选择规则
    const formItems = keys.map(({ ruleId, timeRuleList }, index) => {
        let ruleInitialValue = [];
        if (rulesParamList && rulesParamList[ruleId]) {
            const { algorithmID, scene, eventType } = rulesParamList[ruleId];
            ruleInitialValue = [algorithmID, scene, eventType];
        }

        return (
            <>
                <Form.Item
                    className="add-camera-form-rule"
                    style={keys.length > 1 && index > 0 ? { borderTop: '1px solid #eee', paddingTop: 24 } : null}
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '规则选择' : ''}
                    required
                    key={`ruleList[${ruleId}]`}
                >
                    {getFieldDecorator(`ruleList[${ruleId}]`, {
                        // validateTrigger: ['onChange', 'onBlur'],
                        initialValue: ruleInitialValue,
                        rules: [
                            {
                                required: true,
                                // whitespace: true,
                                message: '请选择规则'
                            }
                        ]
                    })(<Cascader options={ruleOptions} style={{ width: 285.45 }} />)}
                    {keys.length > 1 ? <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => remove(ruleId)} /> : null}
                </Form.Item>
                {timeRuleList.map(item => {
                    let timeInitialValue = {
                        weekDayValue: '',
                        startTime: moment().startOf('day'),
                        endTime: moment().endOf('day')
                    };
                    if (rulesParamList && rulesParamList[ruleId]) {
                        const { timeList } = rulesParamList[ruleId].commonParams;
                        timeInitialValue = {
                            weekDayValue: (timeList[item] && timeList[item].day) || '0',
                            startTime:
                                timeList[item] && timeList[item].timeRange[0].startTime
                                    ? moment(timeList[item].timeRange[0].startTime, 'HH:mm:ss')
                                    : '',
                            endTime:
                                timeList[item] && timeList[item].timeRange[0].endTime ? moment(timeList[item].timeRange[0].endTime, 'HH:mm:ss') : ''
                        };
                    }

                    return (
                        <Form.Item {...formItemLayoutWithOutLabel} label="" key={`timeList${ruleId}[${item}]`}>
                            {getFieldDecorator(`timeList${ruleId}[${item}]`, {
                                // validateTrigger: ['onChange', 'onBlur'],
                                initialValue: timeInitialValue,
                                rules: [
                                    {
                                        // whitespace: true,
                                        message: '请选择时间段',
                                        validator: timeValidator
                                    }
                                ]
                            })(<TimeSelecter />)}
                            {timeRuleList.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    style={{ fontSize: '16px', top: '2px' }}
                                    onClick={() => timeRuleRemove(index, item)}
                                />
                            ) : null}
                        </Form.Item>
                    );
                })}
                <Form.Item {...formItemLayoutWithOutLabel} key={`addTimeIcon${ruleId}`} className="add-camera-form-standard">
                    <Button
                        onClick={() => {
                            timeRuleAdd(index);
                        }}
                        style={{ width: '100%' }}
                    >
                        <Icon type="plus" /> 增加时间段
                    </Button>
                </Form.Item>
            </>
        );
    });

    // 不同类型表单渲染
    const getFields = () => {
        const children = [];
        Object.keys(formItemList).forEach(key => {
            const item = formItemList[key];
            const { label, type, options, placeholder, required, show = true } = item;
            let input;
            let newInitialValue = item.initialValue;
            if (show) {
                switch (type) {
                    case 'select':
                        input = (
                            <Select placeholder={placeholder}>
                                {options
                                    ? options.map(({ value, label: myLabel }) => (
                                          <Option value={value} key={value}>
                                              {myLabel}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        );
                        break;
                    case 'date':
                        input = <DatePicker showTime />;
                        break;
                    case 'rangePicker':
                        input = <RangePicker showTime format="YYYY/MM/DD HH:mm:ss" />;
                        break;
                    case 'multiple':
                        newInitialValue = [];
                        input = (
                            <Select mode="multiple" placeholder="全部" maxTagCount={3}>
                                {options
                                    ? options.map(({ value, label: myLabel }) => (
                                          <Option value={value} key={value}>
                                              {myLabel}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        );
                        break;
                    case 'slider':
                        input = <Slider min={1} max={100} tooltipVisible />;
                        break;

                    default:
                        input = <Input placeholder={placeholder} />;
                        break;
                }
                children.push(
                    <FormItem label={label} key={key} {...formItemLayout} className="add-camera-form-standard">
                        {getFieldDecorator(key, { initialValue: newInitialValue, rules: [{ required, message: placeholder, whitespace: true }] })(
                            input
                        )}
                    </FormItem>
                );
            }
        });
        return children;
    };
    // 关闭modal并重置输入框
    const handleCancel = (): void => {
        handleCloseModal('add');
        setTimeout(() => {
            resetFields();
        }, 500);
    };
    // 验证并关闭modal
    const hanldValidateForm = (): void => {
        validateFields((err, values) => {
            if (!err) {
                const { indexCode, taskName, ruleList } = values;
                const params = { indexCode: indexCode.key, taskName, rulesParamList: [] };
                values.keys.forEach(({ ruleId, timeRuleList }) => {
                    const rule = ruleList[ruleId];
                    const timeList = values[`timeList${ruleId}`];
                    const timeListArr = timeRuleList.map(key => {
                        const { weekDayValue, startTime, endTime } = timeList[key];
                        return {
                            day: weekDayValue,
                            timeRange: [{ startTime: startTime.format('HH:mm:ss'), endTime: endTime.format('HH:mm:ss') }]
                        };
                    });
                    params.rulesParamList.push({ algorithmID: rule[0], scene: rule[1], eventType: rule[2], commonParams: { timeList: timeListArr } });
                });
                params.nameStr = indexCode.nameStr;
                handleAddTask({ ...params, id: updateParams.id || null });
                setTimeout(() => {
                    resetFields();
                }, 500);
            }
        });
    };
    useEffect(() => {
        getAlgorithm().then(({ data }) => {
            const options = data.map(({ algorithmID, ApplyScene }) => {
                const obj = { value: algorithmID, label: '算法' };
                if (ApplyScene && ApplyScene.length > 0) {
                    obj.children = ApplyScene.map(({ scene, EventCfg, description }) => {
                        const objChild = { label: description, value: scene };
                        if (EventCfg && EventCfg.length > 0) {
                            objChild.children = EventCfg.map(({ eventType, eventDescription }) => ({
                                label: eventDescription,
                                value: eventType
                            }));
                        }
                        return objChild;
                    });
                }
                return obj;
            });

            setRuleOptions(options);
        });
    }, []);
    return (
        <>
            <Modal
                title={title}
                width={640}
                maskClosable={false}
                className="add-camera-modal"
                visible={visible}
                onOk={hanldValidateForm}
                onCancel={handleCancel}
            >
                <Form className="add-camera-form">
                    {getFields()}
                    <Form.Item {...formItemLayout} label="选择点位" key="indexCode" className="add-camera-form-standard">
                        {getFieldDecorator('indexCode', {
                            // validateTrigger: ['onChange', 'onBlur'],
                            initialValue: { key: updateParams.indexCode || '', nameStr: updateParams.nameStr || null },
                            rules: [
                                {
                                    // whitespace: true,
                                    message: '请选择点位',
                                    required: true
                                }
                            ]
                        })(<TreeSelector />)}
                    </Form.Item>
                    {formItems}
                    <Form.Item
                        {...formItemLayoutWithOutLabel}
                        key="addRuleIcon"
                        style={{ borderTop: '1px solid #eee', paddingTop: 24 }}
                        className="add-camera-form-standard"
                    >
                        <Button onClick={add} style={{ width: '100%' }}>
                            <Icon type="plus" /> 增加规则
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Form.create<object>()(React.memo(AddCameraModal));

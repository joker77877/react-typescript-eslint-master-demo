import React, { useEffect, forwardRef } from 'react';
import { Select, TimePicker } from 'antd';

interface WeekDaysProps {
    value: string;
    label: string;
}
const { Option } = Select;
const TimeSelecter = ({ size, value = {}, onChange }, ref) => {
    useEffect(() => {}, []);
    const weekDays: WeekDaysProps[] = [
        { value: '', label: '请选择' },
        { value: 'monday', label: '星期一' },
        { value: 'tuesday', label: '星期二' },
        { value: 'wednesday', label: '星期三' },
        { value: 'thursday', label: '星期四' },
        { value: 'friday', label: '星期五' },
        { value: 'saturday', label: '星期六' },
        { value: 'sunday', label: '星期日' }
    ];
    const { weekDayValue, startTime, endTime } = value;
    /* 定义时间数组 */
    const hours = Array.from(Array(24), (v, k) => k);
    const minutes = Array.from(Array(60), (v, k) => k);
    const seconds = Array.from(Array(60), (v, k) => k);

    /* 结束时间控制-hour */
    const disEndHouse = () => {
        if (startTime) {
            const h = startTime.hour();
            return hours.slice(0, h);
        }
        return [];
    };

    /* 结束时间控制-minute） */
    const disEndMinute = h => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            const m = startTime.minute();
            return minutes.slice(0, m);
        }
        return [];
    };

    /* 结束时间控制-second */
    const disEndSeconds = (h, m) => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            if (m > startTime.minute()) return [];
            const s = startTime.second();
            return seconds.slice(0, s);
        }
        return [];
    };

    /* 开始时间控制-hour */
    const disStartHouse = () => {
        if (endTime) {
            const h = endTime.hour();
            return hours.slice(h + 1, hours.length);
        }
        return [];
    };

    /* 开始时间控制-minute */
    const disStartMinute = h => {
        if (endTime) {
            if (h < endTime.hour()) return [];
            const m = endTime.minute();
            return minutes.slice(m + 1, minutes.length);
        }
        return [];
    };

    /* 开始时间控制-second */
    const disStartSeconds = (h, m) => {
        if (endTime) {
            if (h < endTime.hour()) return [];
            if (m < endTime.minute()) return [];
            const s = endTime.second();
            return seconds.slice(s + 1, seconds.length);
        }
        return [];
    };

    const triggerChange = changedValue => {
        if (onChange) {
            onChange({
                weekDayValue,
                startTime,
                endTime,
                ...changedValue
            });
        }
    };
    return (
        <span ref={ref}>
            <Select
                size={size}
                value={weekDayValue}
                style={{ width: 80 }}
                onChange={val => {
                    triggerChange({ weekDayValue: val });
                }}
            >
                {weekDays.map(({ value: myValue, label }) => (
                    <Option key={myValue} value={myValue}>
                        {label}
                    </Option>
                ))}
            </Select>
            <TimePicker
                size={size}
                value={startTime}
                style={{ width: 102.5 }}
                disabledHours={disStartHouse}
                disabledMinutes={disStartMinute}
                disabledSeconds={disStartSeconds}
                onChange={time => {
                    if (startTime && endTime && time.valueOf() > endTime.valueOf()) {
                        triggerChange({ startTime: endTime });
                    } else {
                        triggerChange({ startTime: time });
                    }
                }}
            />
            <TimePicker
                size={size}
                value={endTime}
                style={{ width: 102.5 }}
                disabledHours={disEndHouse}
                disabledMinutes={disEndMinute}
                disabledSeconds={disEndSeconds}
                onChange={time => {
                    if (startTime && endTime && time.valueOf() < startTime.valueOf()) {
                        triggerChange({ endTime: startTime });
                    } else {
                        triggerChange({ endTime: time });
                    }
                }}
            />
        </span>
    );
};
export default forwardRef(TimeSelecter);

import React, { useState, useEffect, forwardRef } from 'react';
import { TreeSelect } from 'antd';
import commmonApi from 'api/common';
import './styles';

const { TreeNode } = TreeSelect;
// import './index.css';
const { getResourceList, getTree, findByOrgIndexCode } = commmonApi;

const SelectPoint = ({ size, value: valueParam, onChange }, ref) => {
    const [treeData, setTreeData] = useState<string[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<object[]>([]);
    // const [checkedKeys, setCheckedKeys] = useState<object[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showSearch, setShowSearch] = useState<string>(false);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    // 根据搜索结果自动展开或者收缩`
    const onExpand = newExpandedKeys => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };
    // 搜索到该节点打开父元素节点
    const getParentKey = (value, tree) => {
        let parentKey;
        for (const node of tree) {
            if (node.children) {
                if (node.children.some(item => item.value === value)) {
                    parentKey = node.value;
                } else if (getParentKey(value, node.children)) {
                    parentKey = getParentKey(value, node.children);
                }
            }
        }
        return parentKey;
    };
    // 将所有层级数据放到同级里
    const generateList = (data, arr) => {
        for (const node of data) {
            const { value, title: myTitle } = node;
            arr.push({ value, title: myTitle });
            if (node.children) {
                generateList(node.children, arr);
            }
        }
        return arr;
    };

    const onLoadData = treeNode =>
        new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            if (treeNode.props.dataRef.leaf) {
                findByOrgIndexCode({ orgIndexCode: treeNode.props.dataRef.value }).then(({ data }) => {
                    treeNode.props.dataRef.children = data.map(({ indexCode, name }) => ({
                        title: name,
                        value: indexCode,
                        isLeaf: true,
                        leaf: true
                    }));
                    setTreeData([...treeData]);
                    resolve();
                });
            } else {
                getTree({ indexCode: treeNode.props.dataRef.value }).then(({ data }) => {
                    treeNode.props.dataRef.children = data.map(({ indexCode, name, leaf }) => ({
                        title: name,
                        value: indexCode,
                        isLeaf: false,
                        leaf: !!leaf
                    }));
                    setTreeData([...treeData]);
                    resolve();
                });
            }
        });
    const getTreeData = () => {
        getTree({ indexCode: 'cb5093d5eda04532a6ba329bf4cd0bcb' }).then(({ data }) => {
            const myTreeData = data.map(({ indexCode, name, leaf }) => ({ title: name, value: indexCode, isLeaf: false, leaf: !!leaf }));
            setTreeData(myTreeData);
        });
    };
    // 搜索树
    const onSearch = value => {
        setSearchValue(value);
        if (value) {
            getResourceList({ name: value }).then(({ data }) => {
                const tree = data.map(({ indexCode, name }) => ({ value: indexCode, title: name, isLeaf: true, leaf: true }));
                setTreeData(tree);
                const newExpandedKeys = generateList(tree, [])
                    .map(item => {
                        if (item.title.indexOf(value) > -1) {
                            return getParentKey(item.value, tree);
                        }
                        return null;
                    })
                    .filter((item, i, self) => item && self.indexOf(item) === i);
                setExpandedKeys(newExpandedKeys);
                setAutoExpandParent(true);
            });
        } else {
            getTreeData();
        }
    };
    // 循环点位
    const loop = data =>
        data.map(item => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const myTitle =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: '#f50' }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return (
                    <TreeNode key={item.value} value={item.value} title={myTitle} isLeaf={item.isLeaf} dataRef={item} selectable={item.isLeaf}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.value} value={item.value} title={myTitle} isLeaf={item.isLeaf} dataRef={item} selectable={item.isLeaf} />;
        });
    const onSelect = (value, node) => {
        onChange({ key: node.props.dataRef.value, nameStr: node.props.dataRef.title });
    };
    // const onBlur = () => {
    //     setSearchValue('');
    //     setShowSearch(true);
    //     console.log(1);
    // };
    // const onFocus = () => {
    //     setShowSearch(false);
    // };

    useEffect(() => {
        getTreeData();
    }, []);
    return (
        <span ref={ref}>
            <TreeSelect
                // checkable
                // onBlur={onBlur}
                // onFocus={onFocus}
                size={size}
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                // showSearch
                placeholder="请选择点位"
                // onSearch={onSearch}
                loadData={onLoadData}
                onExpand={onExpand}
                value={valueParam.nameStr}
                // onCheck={onCheck}
                onSelect={onSelect}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                // checkedKeys={checkedKeys}
            >
                {loop(treeData)}
            </TreeSelect>
        </span>
    );
};
export default forwardRef(SelectPoint);

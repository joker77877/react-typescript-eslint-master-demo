import React from 'react';
import { Pagination, Select, InputNumber, Button } from 'antd';
import Icon from 'components/icon';
import FuncButton from 'components/funcButton';
import './styles/pagination.less';

const Option = Select.Option;

class App extends React.Component {
	constructor(props) {
		super(props);
		let currentPageSize = this.props.pageSize;
		this.state = {
			jumpPage: null,
			currentPageSize: currentPageSize || 10,
			current: props.current
		};
	}

	componentDidMount() {
		this.setState({
			jumpPage: 1
		});
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			current: nextProps.current,
            currentPageSize: nextProps.pageSize,
			jumpPage: nextProps.current
		});
	}
	onShowSizeChange(pageSize) {
		this.setState({
			currentPageSize: pageSize,
            current: 1,
		});
		this.props.onShowSizeChange(1, pageSize);
	}

	jumpToPage() {
		let page = this.state.jumpPage;
		if (!page) return false;
		this.props.onChange(page);
	}

	onJumpChange(page) {
		this.setState({
			jumpPage: page,
			current: page
		});
	}
	goPageFirst() {
		if (this.state.jumpPage > 1) {
			this.setState(
				{
					jumpPage: 1
				},
				() => {
					this.jumpToPage();
				}
			);
		}
	}

	goPagePre() {
		if (this.state.jumpPage > 1) {
			this.setState(
				{
					jumpPage: this.state.jumpPage - 1,
					current: this.state.jumpPage - 1
				},
				() => {
					this.jumpToPage();
				}
			);
		}
	}

	goPageNext() {
		let total = this.props.total;
		let maxPage = Math.ceil(total / parseInt(this.state.currentPageSize));
		if (this.state.jumpPage < maxPage) {
			this.setState(
				{
					jumpPage: this.state.jumpPage + 1,
					current: this.state.jumpPage + 1
				},
				() => {
					this.jumpToPage();
				}
			);
		}
	}

	goPageLast() {
		let total = this.props.total;
		let maxPage = Math.ceil(total / parseInt(this.state.currentPageSize));
		if (this.state.jumpPage < maxPage) {
			this.setState(
				{
					jumpPage: maxPage,
					current: maxPage
				},
				() => {
					this.jumpToPage();
				}
			);
		}
	}

	render() {
		let { state, props } = this;
		let {
			size,
			current,
			defaultCurrent,
			total,
			defaultPageSize,
			pageSize,
			onChange,
			showSizeChanger,
			pageSizeOptions,
			onShowSizeChange,
			showQuickJumper,
			showTotal,
			type
		} = props;
		let props_new = {};
		size ? (props_new.size = size) : delete props_new.size;
		current ? (props_new.current = current) : delete props_new.current;
		defaultCurrent ? (props_new.defaultCurrent = defaultCurrent) : delete props_new.defaultCurrent;
		total ? (props_new.total = total) : delete props_new.total;
		defaultPageSize ? (props_new.defaultPageSize = defaultPageSize) : delete props_new.defaultPageSize;
		pageSize ? (props_new.pageSize = parseInt(pageSize)) : delete props_new.pageSize;
		onChange ? (props_new.onChange = onChange) : delete props_new.onChange;
		showSizeChanger ? (props_new.showSizeChanger = showSizeChanger) : delete props_new.showSizeChanger;
		pageSizeOptions ? (props_new.pageSizeOptions = pageSizeOptions) : delete props_new.pageSizeOptions;
		onShowSizeChange ? (props_new.onShowSizeChange = onShowSizeChange) : delete props_new.onShowSizeChange;
		showQuickJumper ? (props_new.showQuickJumper = showQuickJumper) : delete props_new.showQuickJumper;
		showTotal ? (props_new.showTotal = showTotal) : delete props_new.showTotal;
		type ? (props_new.type = type) : delete props_new.type;
		let maxPage = Math.ceil(total / parseInt(state.currentPageSize));
		return (
			<div
				className="pagination pagination-default"
				style={props.style}
			>
				<div className="pagination-left">
					{type != 'simple' && <span>共{total}条</span>}
					{showSizeChanger && (
						<div className="pagination-size-changer">
							<span className="pagination-size-changer-text1">每页显示</span>
							{pageSizeOptions && pageSizeOptions.length > 0 ? (
								<Select value={pageSize} onChange={::this.onShowSizeChange}>
									{pageSizeOptions.map((item, index) => {
										return (
											<Option key={index} value={item}>
												{item}
											</Option>
										);
									})}
								</Select>
							) : (
								<Select defaultValue={10} onChange={::this.onShowSizeChange}>
									<Option value={10}>10</Option>
									<Option value={20}>20</Option>
									<Option value={30}>30</Option>
									<Option value={40}>40</Option>
								</Select>
							)}
							<span className="pagination-size-changer-text2">条</span>
						</div>
					)}
				</div>
				{showQuickJumper && (
					<div className="pagination-right">
						<span className="pagination-right-text1">跳至</span>
						<InputNumber
							ref="pagination_jump_to"
							min={1}
							max={Math.ceil(total / parseInt(state.currentPageSize)) ? maxPage : 1}
                            precision={0}
							value={state.current}
							onChange={::this.onJumpChange}
						/>
						<span className="pagination-right-text2">/&nbsp;{Math.ceil(total / parseInt(state.currentPageSize)) ? maxPage : 1}页</span>
				
						<Button size="small" className="pagination-btn-jump" onClick={::this.jumpToPage}>
							跳转
						</Button>
				
						{/* <FuncButton size="small" className="pagination-btn-jump" onClick={::this.jumpToPage}>
							跳转
						</FuncButton> */}
				
					</div>
				)}
				{type != 'simple' ? (
					<Pagination {...props_new} />
				) : (
					<div className="pagination-right">
						<span
							title="第一页"
							className={'pagination-simple ' + (state.current == 1 || total == 0 ? ' ant-pagination-disabled' : '')}
							onClick={::this.goPageFirst}
						>
							<Icon type="lidaicon-h-lineangle-left" />
						</span>
						<span
							title="上一页"
							className={'pagination-simple ' + (state.current == 1 || total == 0 ? ' ant-pagination-disabled' : '')}
							onClick={::this.goPagePre}
						>
							<Icon type="lidaicon-h-angle-sm-left" />
						</span>
						<span
							title="下一页"
							className={'pagination-simple ' + (state.current == maxPage || total == 0 ? ' ant-pagination-disabled' : '')}
							onClick={::this.goPageNext}
						>
							<Icon type="lidaicon-h-angle-sm-right" />
						</span>
						<span
							title="最后一页"
							className={'pagination-simple ' + (state.current == maxPage || total == 0 ? ' ant-pagination-disabled' : '')}
							onClick={::this.goPageLast}
						>
							<Icon type="lidaicon-h-lineangle-right" />
						</span>
					</div>
				)}
			</div>
		);
	}
}

export default App;

##使用方法
```jsx
import Pagination from 'components/pagination';
class App extends React.Component {

constructor(){
    this.state={
        currentPage:1,
        total:500,
        pageSize:15
    }
}

onShowSizeChange(currentPage, pageSize){
        this.setState({
            pageSize:pageSize
        });
}

onPageChange(page){
    this.setState({
        currentPage:page
    });
}

render(){
<div>
                    <Pagination
                        current={state.currentPage}
                        total={state.total}
                        pageSize={state.pageSize}
                        showSizeChanger={true}
                        onShowSizeChange={::this.onShowSizeChange}
                        onChange={::this.onPageChange}
                        pageSizeOptions={['15','25','35','45']}
                        showQuickJumper={true}
                    />
</div>
}
...
```
###配置项说明
|属性|说明|类型|是否必填|
|:----:|:----:|:----:|:----:|
|current       |当前页        |number     |是
|total      |总条数        |number         |是
|pageSize       |每页大小       |number     |是
|onChange       |页面改变时的回调方法     |function       |是
|showSizeChanger        |是否展示每页大小选择     |boolean        |[非必填 , 默认false]
|onShowSizeChange       |改变每页大小的回调函数        |function       |[showSizeChanger为true 时需要填]
|pageSizeOptions        |设定可以改变的每页大小        |array      |非必填, 默认是 ['10','20','30','40']
|showQuickJumper        |是否展示快速跳转       |array      |[必填, 默认false]
|type                   |是否展示简单的翻页器   |string          |[非必填,简单的翻页器的话传入'simple' ]

-`current` 必填, 且必需通过`state`进行设置, 并且需要在`onChange`回调函数里面更新
-`pageSize` 必填, 如果要展示每页大小选择, 则需要把`pageSize`通过`state`进行设置, 并且在`onShowSizeChange`回调里面更新
-`defaultPageSize` 和 `defaultCurrent` 最好不要使用
-详细用法请参考antd的Pagination: [http://1x.ant.design/components/pagination/]



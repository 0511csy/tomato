import * as React from 'react';
import {  Menu, Dropdown, Icon } from "antd";
import axios from 'src/config/axios'
import Todos from 'src/components/todos/todos'
import  './Index.scss'

interface IRouter {
	history: any;
}
interface IIndexState {
    user: any;
}
class Index extends React.Component<IRouter,IIndexState> {

	constructor(props: any){
		super(props)
		this.state ={
			user:{}
		}
	}
	async componentWillMount (){
		await this.getMe()
	}
	getMe = async()=>{
		const response = await axios.get('me')
        this.setState({user: response.data})
	}
	loginOut = ()=>{
		localStorage.setItem('x-token','')
		this.props.history.push('/login')
	}

	render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        1st menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        2nd menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                        3rd menu item
                    </a>
                </Menu.Item>
            </Menu>
        );
		return (
			<div className="Index" id="Index">
				{/*<p>欢迎回来，{this.state.user && this.state.user.account}</p>*/}
				{/*<Button onClick={this.loginOut}>注销</Button>*/}
				<header>
					<div className="logo">logo</div>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            {this.state.user && this.state.user.account} <Icon type="down" />
                        </a>
                    </Dropdown>
				</header>
				<div className="todo">
					<Todos/>
				</div>
			</div>
		);
	}
}

export default Index;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import items from './items';
import { Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import { METHODS } from 'http';
import registerServiceWorker from './registerServiceWorker';

const superAgent = require("superagent");

class Feed extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
		};
	}

componentDidMount() {
		const headers = {"Content-Type": "application/json", 
										  "Authorization": "Bearer "};
		fetch('https://api.figure1.com/user/feeds/home?limit=100',  {method: "get", headers} )
			.then(response => response.json())
			.then(data => {
				this.setState({data: prepareFeed(data)})
			})
	}

	render() {
		return (
			<div className="Feed">
				{this.state.data.map((item, i) => {
					return (<Case 
					value={item} />)
				})}
			</div>
		);
	}
}

class Case extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAZlBMVEX///9SVWDsHjLAwMCAgIBycXuYlp3Fw8fxZ1b1l4JaW2bRz9Pw7/CtqrGEgotqaXP7ybng3+JiYm2joKZ7eYOOjJS5t7z81cjuSEL+8ev4o4/tMzn5sJzyc2DwWEz0i3b94thgYGBMu9vrAAAEfElEQVR4nO2baXujIBRGNTNoKy51STppZ/3/f3IEEcGloamYq897vrQGwXtkJ20QHINvjw5gLSBCDYhQAyLUgAg1IEINiFADItSACDUgQg2IUAMi1IAINSBCDYhQAyLUgAg1IEINiFADItSACDUgQg2IUAMi1IAINSBCDYhQAyLUgMiWvL5oXpfu2YXI00nztHTPLkTeDyLyejqIyJ+DiFzfDyLyfDqGiNlD9ixy/XEMkevv0yFEXu362K3I82nMHkWub+Pq2KPIy9uvqcWuRH4+tcxUxe5Ept0CIo8FIlsG6QJEtgzSBYhsGaQLELlZchrXURavGuyneF5HJM1DSRQEkfi5cpQOrCPCk/AYIiw8hgiXEkUUsXrfIjL22rxYM0Q31hPpL8q4ZcUIHVlf5EFAxOQQIrztEXI2FF2DB9M+wqOGtZxjlcb7XHxcjPwg7bOnWZsv69OzXBTCIivTqiJ6ChGwYFw9fEgvuExjfS42LkZ+EKvsdaLmJeEUJcMjFlQ8i2Rmapi5iwxLnvZlFHYpDxA5hzaNq4jykCI8GZUya/JlkXPbcispITqCLXKRz03OcZnGunW4iFz61tjGXCZ9IWWsXszcNLX+qDVcpF0IqlGnhbtIJSVKnSL6l6RrZdXGIvK3Iu0TlImLSDiseC6hfStbaFw+RWSFlMNtXQ25iehQhX1iFCJb2kyVeBSR7zI37zs7i+hsvO/y9sOmY7BHkWjSL7mziK6CehI2NxveJiLM/LTDVWRIaqaFiLbVbClSjYM1wr0hElmfzzAq16/IzANdRS7683mPMNmJyNCzFkSma23qIuPlyaNERgN+9WmRyY1LbDpqpeGnRZrp29hcJLdDCtSifl4kWRCRpaXBbTyKyLCtmZ0tigyzx0hEXtpLK7HMni62PIqUslcay6Ru0pbhitoyh1C2JCKrqjAfNhqfNxDp2taw+lUbJKZvGsLNwkUReae52BLOybSx+RTpqqQ36Td6MtyL5VgnyyJpYpvkkwbrX6T7NazqOCi7kxbdpbvwChkwb8JwWaRbNoaqV1xkGzSX9ZuI6K23ojrrPt45hglj3TYyXxTRhRSsX3jNbdr9itinDwnXpyh646uIdcpUZPw6PB0+fCwSxJV+fp4O51qtibGurYwTrxmR4FIZGsX8wdYqInHUMnsRiJNGMfA3tWjXIni9lYibro83mcol33Qpsk/6QJZ3LlW+dNC/0neIjohorH1r+YkvINL4oxl+UxG+2MK/jk8R0aSszbXstTND5xr4FBENyVyHyAopFm//Gj5FcjVWKbLEY8vyKqK+7M2kStpNgb4qxG9nj4Y5uejnxLsjvYHfUas3Geb2e+O8yd8Xk9X/WSy2zqVyl62eX+6fR8q6ETIVy7PHaxD8e617gQg1IEINiFADItSACDUgQg2IUAMi1IAINSBCDYhQAyLUgAg1IEINiFADItSACDUgQg2IUAMi1IAINSBCDYhQAyLUgAg1IEINiFADItSACDUgQg2IUAMi1IAINSBCjQOJfD8G//4DqwIyOOXOiR4AAAAASUVORK5CYII=",
		};
	}

componentDidMount() {
	const headers = {"Authorization": "Bearer "};
	fetch(`https://api.figure1.com${this.props.value.url}`, {method: "GET", headers} )
		.then(response => response.arrayBuffer())
		.then(data => {
			this.setState({image: `${_imageEncode(data)}`})
		})
}

	render() {
		return (
			<div className="case">
				<Col sm="6">
					<Card>
						<CardImg top width="100%" src={this.state.image}/>
						<CardBody>
							<CardTitle>
								<Author 
									value={this.props.value} />
							</CardTitle>
							<CardText>
								<Caption 
									value={this.props.value.caption} />
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

function Author(props) {
	return (
		<div className="author">
			<div className="username">
				{props.value.username}
			</div>
			<div className="specialty_name">
				{props.value.specialty}
			</div>
		</div>
	);
}

function Caption(props) {
	return (
		<div className="caption">
			{props.value}
		</div>
	);
}

function Image(props) {
	return (
		<div className="Image">
			{props.value}
		</div>
	);
}


ReactDOM.render(<Feed />, document.getElementById('root'));
registerServiceWorker();

function _imageEncode (arrayBuffer) {
	let u8 = new Uint8Array(arrayBuffer)
	let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
	let mimetype="image/jpeg"
	return "data:"+mimetype+";base64,"+b64encoded
}

function prepareFeed(data) {

	const published_feed = []
	data.items.forEach(item => {
		if(item.feedItemType == "categorized") {
			published_feed.push(item.object)
		}
	})

	return published_feed
}

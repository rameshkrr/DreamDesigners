import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
	Image,
	TouchableHighlight, ToolbarAndroid,
	FlatList,
	ScrollView,
	SafeAreaView
    
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackNavigator } from "react-navigation";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome } from '@expo/vector-icons'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as CartAction from '../actions/CartActions';
import Swiper from 'react-native-swiper'




import FAIcon from 'react-native-vector-icons/FontAwesome'

class HomeMain extends Component {
	
	constructor(props) {
        super(props);
        this.states = { quantity: 1 };
    }


    
	state={ 
		data:[],
		data2:[],
		data3:[],
		data4:[],
    }

    fetchData = async() => {
		
        //response
        const response = await
        fetch('https://dreamdesigners.rkhomeappliances.co.in/wp-json/wc/v2/products?filter[product_cat]=highlights&consumer_key=ck_6583bdf76fe9b8d80b98880bf009bb9f03ba819e&consumer_secret=cs_603630202af533fd87ac134c55441c69bcfa4d93');
        //posts //Highlights
		const posts = await response.json();
		this.setState({data:posts});
	}
	fetchData2 = async() =>{
		const response = await
        fetch('https://dreamdesigners.rkhomeappliances.co.in/wp-json/wc/v2/products?filter[product_cat]=fancy&consumer_key=ck_6583bdf76fe9b8d80b98880bf009bb9f03ba819e&consumer_secret=cs_603630202af533fd87ac134c55441c69bcfa4d93');
        //posts //Fancy
		const posts = await response.json();
		this.setState({data2:posts});
	}
	fetchData3 = async() =>{
		const response = await
        fetch('https://dreamdesigners.rkhomeappliances.co.in/wp-json/wc/v2/products?filter[product_cat]=ncomers&consumer_key=ck_6583bdf76fe9b8d80b98880bf009bb9f03ba819e&consumer_secret=cs_603630202af533fd87ac134c55441c69bcfa4d93');
        //posts
		const posts = await response.json();
		this.setState({data3:posts});
	}
	fetchData4 = async() =>{
		const response = await
        fetch('https://dreamdesigners.rkhomeappliances.co.in/wp-json/wc/v2/products?filter[product_cat]=tradition&consumer_key=ck_6583bdf76fe9b8d80b98880bf009bb9f03ba819e&consumer_secret=cs_603630202af533fd87ac134c55441c69bcfa4d93');
        //posts
		const posts = await response.json();
		this.setState({data4:posts});
	}
    componentDidMount(){
        //page load
		this.fetchData();
		this.fetchData2();
		//this.props.ProductAction.getProducts();
    }

	addToCart(product) {
        this.props.CartAction.addToCart(product, this.states.quantity);
    }
 render () {
	const { navigate } = this.props.navigation;
	//const product = this.props.navigation.state.params.product;
	const { entries, activeSlide } = this.state;
	const { entries1, activeSlide1 } = this.state;
	const { entries3, activeSlide3 } = this.state;
	const { entries4, activeSlide4 } = this.state;
	
const carr = <Carousel
data={this.state.data }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item })} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹{item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={true}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide: index }) }
/>
	 const pagni = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide}
		  containerStyle={{marginTop:-20}}
		  dotStyle={{
				  width: 10,
				  height: 10,
				  borderRadius: 5,
				  backgroundColor: 'rgba(255, 255, 255, 0.92)',
		  }}
		  inactiveDotStyle={{
			  backgroundColor: 'rgba(0, 0, 0, 0.75)'
		  }}
		  inactiveDotOpacity={0.4}
		  inactiveDotScale={0.6}
	 />

	 const carr2 = <Carousel
data={this.state.data2 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item })} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹{item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={true}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide1: index }) }
/>
	 const pagni2 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide1}
		  containerStyle={{marginTop:-20}}
		  dotStyle={{
				  width: 10,
				  height: 10,
				  borderRadius: 5,
				  backgroundColor: 'rgba(255, 255, 255, 0.92)',
		  }}
		  inactiveDotStyle={{
			  backgroundColor: 'rgba(0, 0, 0, 0.75)'
		  }}
		  inactiveDotOpacity={0.4}
		  inactiveDotScale={0.6}
	 />

	  const carr3 = <Carousel
data={this.state.data2 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item })} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹{item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={true}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide3: index }) }
/>
	 const pagni3 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide3}
		  containerStyle={{marginTop:-20}}
		  dotStyle={{
				  width: 10,
				  height: 10,
				  borderRadius: 5,
				  backgroundColor: 'rgba(255, 255, 255, 0.92)',
		  }}
		  inactiveDotStyle={{
			  backgroundColor: 'rgba(0, 0, 0, 0.75)'
		  }}
		  inactiveDotOpacity={0.4}
		  inactiveDotScale={0.6}
	 />

	  const carr4 = <Carousel
data={this.state.data2 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item })} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹{item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={true}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide4: index }) }
/>
	 const pagni4 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide4}
		  containerStyle={{marginTop:-20}}
		  dotStyle={{
				  width: 10,
				  height: 10,
				  borderRadius: 5,
				  backgroundColor: 'rgba(255, 255, 255, 0.92)',
		  }}
		  inactiveDotStyle={{
			  backgroundColor: 'rgba(0, 0, 0, 0.75)'
		  }}
		  inactiveDotOpacity={0.4}
		  inactiveDotScale={0.6}
	 />
			 
	
        return (
			<ScrollView>
           <View style={styles.contain}>
		   <Content style={styles.slider}>
				<Swiper 
					autoplay={true}
					style={{height:200}}>
					<View style={{flex:1}}>
					<Image
					style={{flex:1,height:200,width:null,}}
					 source={require('../img/banner3.jpg')} />
					</View>
					<View style={{flex:1}}>
					<Image 
					style={{flex:1,height:200,width:null,}}
					source={require('../img/banner4.jpg')} />
					</View>
					<View style={{flex:1}}>
					<Image 
					style={{flex:1,height:200,width:null,}}
					source={require('../img/banner2.jpg')} />
					</View>
					</Swiper>
            </Content>
						<Text style={styles.heading}>Highlights</Text>
			{carr}
		{pagni}			

		
		<Text style={styles.heading}>Fancy</Text>
		
		{carr2}
{pagni2}

<Text style={styles.heading}>New Comers</Text>
		
		{carr3}
{pagni3}

<Text style={styles.heading}>Traditional</Text>
		
		{carr4}
{pagni4}
		 </View>
		 </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
	androidHeader:{
		...Platform.select({
			android:{
				paddingTop: StatusBar.currentHeight,
			}
		})
	},
	view:{
		height:270,
		backgroundColor:'#fff',
		width:360,
		marginTop:10,
		position:'relative',
	},
	image:{
		flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode:'contain',
    justifyContent:'center',
    
	},
	contain:{
		marginLeft:-10
	},
	heading:{
			textAlign:'center',
			justifyContent:'center',
			backgroundColor:'#fff',
			paddingTop:15,
			paddingBottom:15,

			
	},
	name:{
		textAlign:'center',
		justifyContent:'center',
		color:'#000',
		marginTop:10,
		marginBottom:10,
		fontSize:18
	},
	border:{
		borderBottomWidth:1.5,
		position:'absolute',
		bottom:20,
		left:45,
		width:265,
		marginBottom:20
	},
	button:{
		marginLeft:38,
		marginTop:15,
	},
	price:{
		position:'absolute',
		right:50,
		bottom:10,
	},
	heig:{
		height:10,
		
	},
	slider:{
		width:370,
		marginBottom:10
	}
	


})
function mapDispatchToProps(dispatch) {
	return {
		CartAction: bindActionCreators(CartAction, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(HomeMain);
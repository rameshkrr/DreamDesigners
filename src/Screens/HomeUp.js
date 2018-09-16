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
	SafeAreaView,
	BackHandler,
  Alert,
    
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackNavigator } from "react-navigation";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome } from '@expo/vector-icons'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as CartAction from '../actions/CartActions';
import Swiper from 'react-native-swiper';
import Constants from '../constants/Constants';
import LoadingAnimation from '../img/loader2.gif'; 
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import FAIcon from 'react-native-vector-icons/FontAwesome'

class HomeUp extends Component {
	
	constructor(props) {
        super(props);
        this.states = { quantity: 1 , isfetched: false};
    }


    
	state={ 
		data:[],
		data2:[],
		data3:[],
		data4:[],
    }

    fetchData = async() => {	
		//response
		//ID = 23
		const domain = Constants.URL.wc
		const ck = Constants.Keys.ConsumerKey
		const cs = Constants.Keys.ConsumerSecret
		const url = domain+'products?per_page=100&category=23&consumer_key='+ck+'&consumer_secret='+cs+''
		const response = await
		fetch(url);
		//posts //Highlights
	const posts = await response.json();
	this.setState({data:posts});
	}
	fetchData2 = async() =>{
	
	  //fancy ID 72
	  const domain = Constants.URL.wc
		const ck = Constants.Keys.ConsumerKey
		const cs = Constants.Keys.ConsumerSecret
		const url = domain+'products?per_page=100&category=72&consumer_key='+ck+'&consumer_secret='+cs+''
		
	const response = await
	
		fetch(url);
		//posts //Fancy
	const posts = await response.json();
	this.setState({data2:posts});
	}
	fetchData3 = async() =>{
	  //ncomers ID 71
	  const domain = Constants.URL.wc
		const ck = Constants.Keys.ConsumerKey
		const cs = Constants.Keys.ConsumerSecret
		const url = domain+'products?per_page=100&category=71&consumer_key='+ck+'&consumer_secret='+cs+''
		
	const response = await
		fetch(url);
		//posts
	const posts = await response.json();
	this.setState({data3:posts});
	}
	fetchData4 = async() =>{
		//tradi 73
		const domain = Constants.URL.wc
		const ck = Constants.Keys.ConsumerKey
		const cs = Constants.Keys.ConsumerSecret
		const url = domain+'products?per_page=100&category=73&consumer_key='+ck+'&consumer_secret='+cs+''
	
	const response = await
		fetch(url);
		//posts
	const posts = await response.json();
	this.setState({data4:posts});
	}
    componentDidMount(){
        //page load
		this.fetchData();
		this.fetchData2();
		this.fetchData3();
		this.fetchData4();
		//this.props.ProductAction.getProducts();
    }

	addToCart(product) {
        this.props.CartAction.addToCart(product, this.states.quantity);
	}
	
 render () {

	const { isfetched, imageIsFetched } = this.state;
	const { navigate } = this.props.navigation;
	//const product = this.props.navigation.state.params.product;
	const { entries, activeSlide } = this.state;
	const { entries1, activeSlide1 } = this.state;
	const { entries3, activeSlide3 } = this.state;
	const { entries4, activeSlide4 } = this.state;
	
const carr = 


<Carousel
layout={'stack'} layoutCardOffset={`18`}
data={this.state.data }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item , page:'home' })} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹ {item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={false}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide: index }) }
/>

	 const pagni = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide}
		  containerStyle={{marginTop:-60}}
		  dotStyle={{
				  width: 10,
				  height: 10,
				  borderRadius: 5,
				  backgroundColor: '#ebebeb',
		  }}
		  inactiveDotStyle={{
			  backgroundColor: 'rgba(0, 0, 0, 0.75)'
		  }}
		  inactiveDotOpacity={0.4}
		  inactiveDotScale={0.6}
	 />
	 

	 const carr2 = <Carousel
	 layout={'stack'} layoutCardOffset={`18`}
data={this.state.data2 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item , page:'home'})} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹ {item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={false}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide1: index }) }
/>
	 const pagni2 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide1}
		  containerStyle={{marginTop:-60}}
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
	  layout={'stack'} layoutCardOffset={`18`}
data={this.state.data3 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item , page:'home'})} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹ {item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 


}
autoplay={false}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide3: index }) }
/>
	 const pagni3 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide3}
		  containerStyle={{marginTop:-60}}
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
	  layout={'stack'} layoutCardOffset={`18`}
data={this.state.data3 }
keyExtractor = {(x,i) =>i.toString()}
ref={(c) => { this._carousel = c; }}

renderItem = {({item})=>
<TouchableHighlight  onPress={() => navigate("Products", { product: item , page:'home'})} underlayColor="transparent">
	<View style={styles.view} >
<Image style={styles.image} source={{uri: item.images[0].src}} />
	<Text style={styles.name}>{item.name}</Text>
	<View style={styles.border}></View>
	
	<TouchableOpacity style={styles.button} onPress={() =>  this.props.CartAction.addToCart(item, this.states.quantity)} >
                        <Text style={{ color: '#000' }}> ADD TO CART </Text>
                    </TouchableOpacity>
					<Text style={styles.price}>₹ {item.price}</Text>
					<View style={styles.heig}></View>
</View>
		  </TouchableHighlight> 
}
autoplay={false}
sliderWidth={450}
itemWidth={430}
onSnapToItem={(index) => this.setState({ activeSlide4: index }) }
/>
	 const pagni4 = <Pagination
	 style={styles.navigat}
	 dotsLength={3}
		  activeDotIndex={activeSlide4}
		  containerStyle={{marginTop:-60}}
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
			<ScrollView style={{backgroundColor:'#ebebeb'}}>
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
			<View style={styles.iconcontent}>
			<Image style={styles.icon} source={{uri: 'https://dreamdesigners.rkhomeappliances.co.in/wp-content/uploads/2018/08/princess-dress-icons.png' }} /> 
			<View style={{flex:1}}>
						<Text style={styles.heading}>HighLights</Text></View>
						<View style={{flex:1}}><Text style={styles.viewall} 
						onPress={() => navigate('Category', { category: 'highlights',catname:'HighLights',catid:23 ,page:'home'})}>
						View All</Text></View>
			</View>
			
		<View>
					{this.state.data.length ? carr :
					<View>
					
					<ShimmerPlaceHolder autoRun={true} width={400} height={250} duration={10} colorShimmer={['#ebebeb','#ebebeb']}>
					</ShimmerPlaceHolder>		
					</View>	
					}
				
					</View>
					{pagni}
		<View style={styles.iconcontent}>
			<Image style={styles.icon} source={{uri: 'https://dreamdesigners.rkhomeappliances.co.in/wp-content/uploads/2018/08/clothes-vector-icon-8.png' }} /> 
			<View style={{flex:1}}>
						<Text style={styles.heading}>Fancy</Text></View>
						<View style={{flex:1}}><Text style={styles.viewall} 
						onPress={() => navigate('Category', { category: 'fancy',catname:'Fancy',catid:72 ,page:'home'})}>
						View All</Text></View>
			</View>
			<View>
					{this.state.data.length ? carr2 :
					<View>
					
					<ShimmerPlaceHolder autoRun={true} width={400} height={250} duration={10} colorShimmer={['#ebebeb','#ebebeb']}>
					</ShimmerPlaceHolder>		
					</View>	
					}
				
					</View>
					{pagni2}


<View style={styles.iconcontent}>
			<Image style={styles.icon} source={{uri: 'https://dreamdesigners.rkhomeappliances.co.in/wp-content/uploads/2018/08/dress-front-view.png' }} /> 
			<View style={{flex:1}}>
						<Text style={styles.heading}>New Comers</Text></View>
						<View style={{flex:1}}><Text style={styles.viewall} 
						onPress={() => navigate('Category', { category: 'ncomers',catname:'New Comers',catid:71 ,page:'home'})}>
						View All</Text></View>
			</View>
		
			<View>
					{this.state.data.length ? carr3 :
					<View>
					
					<ShimmerPlaceHolder autoRun={true} width={400} height={250} duration={10} colorShimmer={['#ebebeb','#ebebeb']}>
					</ShimmerPlaceHolder>		
					</View>	
					}
				
					</View>
					{pagni3}

<View style={styles.iconcontent}>
			<Image style={styles.icon} source={{uri: 'https://dreamdesigners.rkhomeappliances.co.in/wp-content/uploads/2018/08/princess-dress-icons.png' }} /> 
			<View style={{flex:1}}>
						<Text style={styles.heading}>Traditional</Text></View>
						<View style={{flex:1}}><Text style={styles.viewall} 
						onPress={() => navigate('Category', { category: 'tradition',catname:'Traditional',catid:73 ,page:'home'})}>
						View All</Text></View>
			</View>
		
			<View>
					{this.state.data.length ? carr4 :
					<View>
					
					<ShimmerPlaceHolder autoRun={true} width={400} height={250} duration={10} colorShimmer={['#ebebeb','#ebebeb']}>
					</ShimmerPlaceHolder>		
					</View>	
					}
				
					</View>
					{pagni4}
		 </View>
		 </ScrollView>
        );
    }
    componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', this.backPressed);
}
componentWillUnmount(){
     
     BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    
}
backPressed = () => {

  Alert.alert(
    'Exit App',
    'Do you want to exit?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ],
    { cancelable: false })

return true;

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
	iconcontent:{
		flexDirection:'row',
		backgroundColor:'#fff',
	},
	icon:{
		width:40,
		height:40,
		marginLeft:20,
		marginTop:10
	},
	contain:{
		marginLeft:-10
	},
	heading:{
			textAlign:'left',
			justifyContent:'center',
			marginTop:20,
			paddingBottom:15,
			paddingLeft:5,
			fontSize:18	,
			color:'#4C3E54'
	},
	viewall:{
		textAlign:'right',
			marginTop:20,
			paddingBottom:15,
			paddingRight:15,
			fontSize:16	,
			color:'#4C3E54',
			textDecorationLine: "underline",
    textDecorationStyle: "solid",
	textDecorationColor: "#000",
	fontSize:16
	},
	name:{
		textAlign:'center',
		justifyContent:'center',
		color:'#ee3f8b',
		marginTop:10,
		marginBottom:10,
		fontSize:18
	},
	border:{
		borderBottomWidth:1.5,
		position:'absolute',
		bottom:20,
		left:17,
		width:'90%',
		marginBottom:20,
		borderBottomColor:'#4C3E54'
	},
	button:{
		marginLeft:38,
		marginTop:15,
	},
	price:{
		position:'absolute',
		right:50,
		bottom:10,
		fontSize:18
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

export default connect(null, mapDispatchToProps)(HomeUp);
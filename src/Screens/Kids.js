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
	ScrollView
    
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackNavigator } from "react-navigation";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome } from '@expo/vector-icons'

import FAIcon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
//import * as ProductAction from '../actions/ProductActions';



class Kids extends Component {


	
	state={ 
        data:[],
        urls : this.props.navigation.state.params.category

    }


    fetchData = async() => {

    	const  namess= this.props.navigation.state.params.catid
        //response
        const response = await
        //Fetching cat using V1
        fetch("https://dreamdesigners.rkhomeappliances.co.in/wp-json/wc/v2/products?per_page=8&category="+namess+"&consumer_key=ck_6583bdf76fe9b8d80b98880bf009bb9f03ba819e&consumer_secret=cs_603630202af533fd87ac134c55441c69bcfa4d93");
        //posts
        const posts = await response.json();
        this.setState({data:posts});
    }
    componentDidMount(){
        //page load
   		this.props.navigation.addListener("willFocus", this.fetchData);
		//this.props.ProductAction.getProducts();
    }
	static navigationOptions ={
		drawerIcon:(
				<FontAwesome name="home" size={30} color="black" />
			)
	}
    render() {
        const { navigate } = this.props.navigation;
        		const namess = this.props.navigation.state.params.catname;
        		

        return (
			
        	<Container>
            
			<ScrollView style={{backgroundColor:'#eeeeee'}}>
			<Card>
			<CardItem header style={{flex:1,height:50,justifyContent:'center'}}>
				<Text style={{textAlign:'center',justifyContent:'center',fontSize:18}}>
					{namess}
				</Text>
			</CardItem>
			</Card>
			<View>
        			<FlatList contentContainerStyle={styles.list} numColumns={2} 
            data={this.state.data || []}
            keyExtractor = {(x,i) =>i.toString()}
            renderItem = {({item})=>
                <TouchableHighlight style={{width:'50%'}} onPress={() => navigate("Products", { product: item })} underlayColor="white">
				<View style={styles.view} >
          <Image style={styles.image} source={{uri: item.images[0].src}} />
          <Text style={styles.text}>{item.name}</Text>
		  <View style={styles.borderNow}></View>
		  <View style={styles.cartPrice}>
			  <Text style={styles.addCart}>₹{item.price}</Text>
			  <Text style={styles.price}>
			  
			  </Text> 
			  </View>
        </View>
					  </TouchableHighlight> 
			} />
			</View>	
				</ScrollView>
        	</Container>
			
        )
    }
}
export default Kids;
const styles = StyleSheet.create({
	androidHeader:{
		...Platform.select({
			android:{
				paddingTop: StatusBar.currentHeight,
			}
		})
	},
	list: {
		flexDirection: 'column',
		marginTop:20,
	  },
	  text: {
		textAlign: 'center',
		fontSize: 20,
		padding: 5,
		backgroundColor:'#fff',
		width:165,
		paddingBottom:20,

	  },
	  image: {
		flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode:'contain',
    justifyContent:'center',
		backgroundColor:'#fff',
		paddingTop:220,
	  },
	  view:{
		marginLeft:10,
		width:165
	  },
	  addCart:{
		  textAlign:'center',
		  fontSize:14,
		  fontSize:18,
		  paddingBottom:20
	  },
	  price:{
		position:'absolute',
		right:5,
		bottom:0,
		paddingBottom:20,
		fontSize:18
	  },
	  cartPrice:{
		backgroundColor:'#fff',
		marginBottom:30,
		width:165,
		paddingTop:10
	  },
	  borderNow:{
		  borderBottomWidth:1,
		  position:'absolute',
		  top:260,
		  left:15,
		  width:137,

	  }
})

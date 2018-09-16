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
	BackHandler,
	Modal
    
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackNavigator , NavigationActions } from "react-navigation";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome,EvilIcons } from '@expo/vector-icons'
import Cart from './Cart'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import * as CartAction from '../actions/CartActions';

//import * as ProductAction from '../actions/ProductActions';



class Category extends Component {


	
	state={ 
        data:[],
		urls : this.props.navigation.state.params.category,
		modalVisible: true,
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
		this.props.CartAction.getCart();
    }
    	_keyExtractor = (item, index) => item.id.toString();

    total(){
		const { cart } = this.props;
      var sum = 0;
          cart.forEach(function(element) {
            
            sum += parseFloat(  element.quantity );
          });
          return sum
	  }
	noproducts(){
		
		if(this.state.data && this.state.data.length == 0){
			
		 
				
					return(
						<View style={{flex:1}}>
					<Text style={{textAlign:'center',fontSize:20}}>Upcoming Designs Soon</Text>
					</View>
						
					)
		}
		else{
			return(
				<Text></Text>
			)
		}
		 
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	  }	
    render() {
        const { navigate } = this.props.navigation;
		const namess = this.props.navigation.state.params.catname;
		const catlength = this.props.navigation.state.params.itemno;
		
       	

        return (
			<View>
				
				<Modal
          transparent={false}
		  visible={this.state.modalVisible}
		  onRequestClose={() => {
            this.backPressed()
          }}>
       
        	<View style={{backgroundColor:'#fff',elevation:2,height:50}}>
					<View style={{flex:1}}><Text style={{textAlign:'left',marginTop:10,position:'absolute',left:5,width:40,}} onPress={() => { this.backPressed() }}>
					<Ionicons name="ios-arrow-back" size={30} />
					</Text></View>
					<View style={{flex:1}}>
					<Text style={{ marginTop:-10, color: 'black',position:'absolute',right:0,marginRight:5,width:40, }}
			onPress={() => { navigate('Cart') }}
		>
			<EvilIcons name="cart" size={30} />
			{this.total()}
		</Text>
					</View>
				</View>
        	<Container>
            
			<ScrollView style={{backgroundColor:'#eeeeee'}}>
			<Card style={{backgroundColor:'#fafafa',marginTop:0,width:'100%',marginLeft:-1}}>
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
                <TouchableHighlight style={{width:'50%'}} onPress={() => navigate("Products", { product: item,page:'category' })} underlayColor="white">
				<View style={styles.view} >
          <Image style={styles.image} source={{uri: item.images[0].src}} />
          <Text style={styles.text}>{item.name}</Text>
		  <View style={styles.cartPrice}>
			  <Text style={styles.addCart}>₹{item.price}</Text>
			  
			  </View>
        </View>
					  </TouchableHighlight> 
			} />
		
			</View>	
			
				</ScrollView>
        	</Container>
			</Modal>
			</View>
			
        )
	} 
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	  }
	  componentWillUnmount(){
		   
		   BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
		  
	  }
	  backPressed = () => {
	  
        const { navigate } = this.props.navigation;
        const page = this.props.navigation.state.params.page;
        if(page == 'home'){
			this.setModalVisible(!this.state.modalVisible);
          navigate("HomeUp");
        }if(page == 'category'){
			this.setModalVisible(!this.state.modalVisible);
			navigate("Subcat");
        }
	  }
	  
}
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CartAction: bindActionCreators(CartAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
const styles = StyleSheet.create({
	
	list: {
		flexDirection: 'column',
		marginTop:10,
		marginLeft:5,
		marginRight:10
	  },
	  text: {
		textAlign: 'center',
		fontSize: 20,
		padding: 5,
		backgroundColor:'#fff',
		width:170,
		paddingBottom:3,
		color:'grey'
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
		marginLeft:5,
		width:170,
		marginBottom:-25
	  },
	  addCart:{
		  textAlign:'center',
		  fontSize:14,
		  fontSize:18,
		  paddingBottom:5,
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
		width:170,
	  },
	  borderNow:{
		  borderBottomWidth:1,
		  position:'absolute',
		  top:260,
		  left:15,
		  width:137,
	  }
})

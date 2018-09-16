import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
	Image,
	TouchableHighlight,
    ToolbarAndroid,
	FlatList,
	ScrollView,
	AsyncStorage
    
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackNavigator } from "react-navigation";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons'

import FAIcon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import * as CartAction from '../actions/CartActions';

class Cart extends Component {
	state={ 
        data:[]
    }

    componentDidMount(){
		this.props.CartAction.getCart();
	}
	_keyExtractor = (item, index) => item.id.toString();

	removeItem(item) {
		this.props.CartAction.removeFromCart(item);
    }
    total(){
      const { cart } = this.props;
      var sum = 0;
          cart.forEach(function(element) {
            
            sum += parseFloat( element.price * element.quantity );
          });
          return sum
    }
     render() {
    const { cart } = this.props;
	console.log('render cart', cart);
	const { navigate } = this.props.navigation;

    if (cart && cart.length > 0) {
      const Items = <FlatList contentContainerStyle={styles.list}
        data={cart}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) =>
        <View>
          <View style={styles.lineItem} >
          
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.text}>Name: {item.name}{"\n"}Price: ₹ {item.price}{"\n"}Quantity: {item.quantity}</Text>
            
            <TouchableOpacity style={{marginTop:20}}  onPress={() => this.removeItem(item)}><Text style={styles.transparentButton2}>Remove</Text></TouchableOpacity>
            
          </View>
          
          </View>
        }
      />;
      return (
        <View style={styles.container}>
        <ScrollView>
       
      {Items}
      </ScrollView>
      <View style={{flexDirection:'row',height:60, borderWidth: 1,
  borderRadius: 2,
  borderColor: '#ddd',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  marginTop: 10,}}>
      <View style={{flex:1}}>
      <Text style={{textAlign:'center',fontsize:20,paddingTop:10}}>Total:</Text>
      <Text style={{textAlign:'center',fontWeight:'600',fontsize:22}}>₹ {this.total()}.00</Text>
      </View>
      <View style={{flex:1}}>
		  <TouchableOpacity style={styles.button} underlayColor="#1f1f1f" onPress={() => navigate("Checkout")} >
                        <Text style={{ color: '#fff' }}> CHECKOUT </Text>
                    </TouchableOpacity>
        </View>
        </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Cart is empty!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  lineItem: {
	flexDirection: 'row',
	marginBottom:15,
  width:600,
  borderRadius: 2,
  borderColor: '#ddd',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  paddingTop:15,
  paddingBottom:15,
  marginTop:20
  },
  list: {
    flexDirection: 'column',
    
  },
  image: {
    width: 100,
    height: 100,
    resizeMode:'contain',
    justifyContent:'center',
    marginLeft:20

  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
  fontSize: 20,
	marginTop:20,
  marginLeft:20,
  textAlign:'left'
  },
  price: {
    fontSize: 20,
  padding: 5,
  },
  button: {
	alignItems: 'center',
	backgroundColor: '#4C3E54',
	paddingTop:10,
	width: '100%',
  height: 40,
  borderRadius:10,
  marginTop:10,
  paddingBottom:10,
  marginLeft:-20
},
  transparentButton2:{
     fontSize: 18,
    fontWeight: '100',
    color: '#4C3E54',
    padding: 8,
    margin: 5,
    borderRadius: 2,
    borderColor: '#4C3E54',
    borderWidth: 1,
    textAlign: 'center'
  },
  total:{
    textAlign:'right',
    marginRight:20,
    fontSize:20,
    fontWeight:'400',
    color:'#333'
  },
  grandtotal:{
    textAlign:'left',
    fontSize:20,
    fontWeight:'400',
    marginLeft:20,
    color:'#333',
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
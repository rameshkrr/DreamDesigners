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
    ScrollView,TextInput,
    AsyncStorage,
    BackHandler,
    Modal
    
} from "react-native";
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import { Ionicons,FontAwesome,EvilIcons } from '@expo/vector-icons'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import * as CartAction from '../actions/CartActions';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 1 };
    }

    decreaseQuantity = () => {
        if(this.state.quantity <= 1) {
            return;
        } else {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    }

    state={ 
        modalVisible: true,
    }

    increaseQuantitiy = () => {
        this.setState({
            quantity: this.state.quantity - 1 + 2
        });
    }
    addToCart(product) {
        this.props.CartAction.addToCart(product, this.state.quantity);
    }

    componentDidMount(){
        //page load
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
    

   
    render() {
      
        const product = this.props.navigation.state.params.product;
        
        const regex = /(<([^>]+)>)/ig;
        obj = {};
        const { navigate } = this.props.navigation;

        return (
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
           <Container style={styles.maincontent}>
            <ScrollView>
            <View style={{backgroundColor:'#fff'}}>
            <Image style={styles.image} source={{ uri: product.images[0].src }} />
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
            <Text style={{fontSize:18,color:'#333',fontWeight:'bold',marginLeft:20,marginTop:10,textAlign:'left'}}>{product.name}</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={{textAlign:'right',color:'#333',fontSize:20,fontWeight:'bold',marginTop:10,marginRight:20}}> ₹ {product.price}</Text>
            </View>
            </View>
            <View>
            <Text style={{textAlign:'left',fontWeight:'400',marginLeft:20,fontSize:18,marginTop:10}}>Product description:</Text>
            <Text style={styles.desc}>{product.short_description.replace(regex, '')}</Text>
            </View>
            <View>
            <Text style={{textAlign:'left',fontWeight:'400',marginLeft:20,fontSize:18}}>Other Details:</Text>
            <Text style={{textAlign:'left',color:'#828282',fontSize:18,marginLeft:20}}> { product.meta_data[1].value[0] + ' Working Days'}</Text>
            </View>
  
          <View style={{ display: 'flex',justifyContent: 'center', flexDirection: 'row', padding: 10, marginLeft: 20, marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.decreaseButton} onPress={this.decreaseQuantity}>
                            <Text> - </Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            onChangeText={(quantity) => this.setState({ quantity })}
                            value={`${this.state.quantity}`}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.inceaseButton} onPress={this.increaseQuantitiy} >
                            <Text> + </Text>
                        </TouchableOpacity>
                    </View>
                   
                   
                </View>   
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => this.addToCart(product)} >
                        <Text style={{ color: '#fff' }}> ADD TO CART </Text>
                    </TouchableOpacity>
            </Container>
            </Modal>
            
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
         return navigate("HomeUp");
        }if(page == 'category'){
            return navigate("Category");
        }
	  }
}
const styles = StyleSheet.create({
     
    maincontent:{
        backgroundColor:'#f4f4f4',
    },
    image: {
       
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height:220,
        resizeMode:'contain',
        justifyContent:'center',
        marginTop:10,

    },
    desc:{
        fontSize:18,       
        marginTop:6,
        marginBottom:10,
        textAlign:'left',
        lineHeight:23,
        marginLeft:20,
        color:'#828282',
    },
    text: {
        fontSize: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        width: 50,
        borderWidth: 1,
        borderColor: 'rgba(27,31,35,0.05)',
        padding: 10,
        backgroundColor: 'rgba(27,31,35,0.05)',
        textAlign:'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#4C3E54',
       paddingTop:20,
        width: '100%',
        height: 50,
        fontSize:18,
        marginTop:10,
        // borderBottomLeftRadius: 17,
        // borderBottomRightRadius: 17,
        // borderTopLeftRadius: 17,
        // borderTopRightRadius: 17,      
    },
    decreaseButton: {
        height: 40,
        width: 30,
        padding: 10,
        backgroundColor: 'rgba(27,31,35,0.05)',
        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
    },
    inceaseButton: {
        height: 40,
        width: 30,
        padding: 8,
        backgroundColor: 'rgba(27,31,35,0.05)',
        borderBottomRightRadius: 17,
        borderTopRightRadius: 17,
    },
    description: {
        fontSize: 14,
        padding: 15,
    },
    html: {
        paddingLeft: 20,
        paddingRight: 20
    }
});
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
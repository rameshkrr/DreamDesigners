import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
	Image,
	TouchableHighlight,
	FlatList,
	ScrollView
} from "react-native";
import {Icon, Button, Container, Header, Content,Left ,Right,Item,Input,Card,CardItem} from 'native-base'
import Constants from '../constants/Constants';
import LoadingAnimation from '../img/loader2.gif'; 


class Subcat extends Component {


	state={ 
        data:[],
        urls : this.props.navigation.state.params.category

    }

    fetchData = async() => {

    	const  namess= this.props.navigation.state.params.catid
				//response
				const domain = Constants.URL.wc
				const ck = Constants.Keys.ConsumerKey
				const cs = Constants.Keys.ConsumerSecret
				const url = domain+'products/categories?per_page=100&parent='+namess+'&consumer_key='+ck+'&consumer_secret='+cs+''
				
        const response = await
        //Fetching cat using V1
        fetch(url);
        //posts
        const posts = await response.json();
        this.setState({data:posts});
    }
    componentDidMount(){
        //page load
   		this.props.navigation.addListener("willFocus", this.fetchData);
        //this.props.ProductAction.getProducts();
        //this.fetchData();
    }
	
    render() {
        const { navigate } = this.props.navigation;
		const ids = this.props.navigation.state.params.catid;
		const Names = this.props.navigation.state.params.name;
    const Items = 	
            
	
				<FlatList contentContainerStyle={styles.list} numColumns={2} style={{width:null}}
	data={this.state.data }
	keyExtractor = {(x,i) =>i.toString()}
	renderItem = {({item})=>
			<TouchableHighlight style={styles.contents} onPress={() => navigate('Category', { category: item.slug,catname:item.name,catid:item.id ,page:'category',categoryAll:item,itemno:this.state.data.length})}>

<View style={styles.view} >
<View >
<Image style={styles.image} source={{uri:  item.image.src }} /> 
</View>

<Text style={styles.text}>{item.name}</Text>



</View>
	</TouchableHighlight> 
	} />
	

        return (
			
					<ScrollView style={{backgroundColor:'#eeeeee'}}>
					<View >
					<Image style={styles.image2} source={{uri:  'https://dreamdesigners.rkhomeappliances.co.in/wp-content/uploads/2018/08/617792.jpg' }} /> 
					</View>
					<View>
					{this.state.data.length ? Items : 
					<View style={{alignItems: 'center', justifyContent: 'center',}}>
							<Image style={{height:50,width:50,marginTop:'25%' }} source={LoadingAnimation}/>
					</View>		
					}
					</View>	
			</ScrollView>
        )
    }
}
export default Subcat;
const styles = StyleSheet.create({
	
	 
		loader: {
			width: 50,
			height: 50,
			alignSelf: "center"
		},
	
	  image2: {
		flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode:'contain',
    justifyContent:'center',
	paddingTop:198,
	
	  },
	 title: {
    	fontSize: 20,
		padding: 3,
		textAlign:'center',
		fontWeight:'100'
  },
  slider:{
		width:370,
		marginBottom:20,
	},
	image:{
	    width: 200,
	    height: 100,
	    resizeMode:'contain',
	    flex:1,
	    marginLeft:-20
	},
	contents:{
		elevation:3,
		backgroundColor:'#fff',
		width:'43%',
		marginLeft:18,
		marginBottom:20,
	},
	text:{
		textAlign:'center',
		padding:5,
		fontSize:18	
	}
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Header, Icon, ListItem } from "react-native-elements";
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import moment from 'moment';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleDetails: {},
            visible: true,
            isFetching: false
        }
    }

    componentDidMount() {
        this.getArticle()
        setTimeout(() => {
            this.setState({
              visible: !this.state.visible
            });
        }, 50000);
    }

    getArticle = () => {
    const url = " http://e3f2d74718ca.ngrok.io";

    axios
    .get(url)

    .then(response => {
        let details = response.data.data;
        this.setState({
            articleDetails: details,
            isFetching: false
        });
    })
    }

    onRefresh = () => {
        this.setState({isFetching: true,},() => {this.getArticle();});
    }

    renderItem = ({item, index}) => (
        <ListItem
        key = {index}
        bottomDivider
        title = {`Article Name : ${item.title.toUpperCase()}`}
        titleStyle = {{color: '#F24C00', fontSize : 18, fontWeight: "bold"}}
        subtitle = {`Date Published : ${moment.unix(item.timestamp).format("DD/MM/YYYY")}`}
        subtitleStyle = {{color: '#FC7A1E', fontSize: 16}}
        chevron = {{color: '#F9C784', size: 25}}
        onPress = {() => {
            this.props.navigation.navigate("ViewArticle", {
                article_name: item.title.toUpperCase(),
                url: item.url,
                id: item.id
            })
        }}
        containerStyle = {{backgroundColor: '#E7E7E7'}}
        >
        </ListItem>
    )

    keyExtractor = (item, index) => index.toString();

    render() {

        const { articleDetails, visible } = this.state;

        return(
            <View style = {{backgroundColor: '#E7E7E7'}}>
            <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../loader.json")}
            animationStyle={styles.lottie}
            speed={1}
            >
                <Text>Fetching article metadata...</Text>
            </AnimatedLoader>
            <FlatList
                keyExtractor = {this.keyExtractor}
                data = {articleDetails}
                renderItem = {this.renderItem}
                maxToRenderPerBatch = {10}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100
    }
});
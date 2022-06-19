import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { WebView } from 'react-native-webview';
import { Card, Icon } from 'react-native-elements';
import axios from "axios";

export default class ViewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_name : this.props.navigation.getParam("article_name"),
            url : this.props.navigation.getParam("url"),
            id : this.props.navigation.getParam("id"),
            disable: false
        }
    }

    componentDidMount() {
        this.setState({
            disable: false
        })
    }

    like = () => {
        const url = " http://e3f2d74718ca.ngrok.io/liked-article?id=" + this.state.id
        axios
        .post(url)
        .then(response => {
            alert("Thank you for your response! Reload the app to see the changes.")
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    dislike = () => {
        const url = " http://e3f2d74718ca.ngrok.io/not-liked-article?id=" + this.state.id
        axios
        .post(url)
        .then(response => {
            alert("Thank you for your response! Reload the app to see the changes.")
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                source={{ uri: this.state.url }}
                containerStyle = {{flex: 0.9}}/>
                <Card
                containerStyle = {{flex: 0.1, backgroundColor: '#E7E7E7'}}>
                    <Text style = {{color: '#F24C00', fontSize : 18, fontWeight: "bold"}}>Liked the article?</Text>
                    <View
                    style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 10
                    }}>
                        <Pressable
                        onPress = {() => {
                            this.like()
                            this.setState({
                                disable: true
                            })
                        }}
                        android_ripple = {true}
                        disabled = {this.state.disable}>
                            <Icon name = "check" type = "feather" size = {40} color = "#15D849"/>
                        </Pressable>

                        <Pressable
                        onPress = {() => {
                            this.dislike()
                            this.setState({
                                disable: true
                            })
                        }}
                        android_ripple = {true}
                        disabled = {this.state.disable}>
                            <Icon name = "x" type = "feather" size = {40} color = "#F24C00"/>
                        </Pressable>
                    </View>
                </Card>
            </SafeAreaView>
        )
    }
}
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
// import tempData from "./tempData";
import TodoList from "../todoComponents/TodoList";
import AddListModal from "../todoComponents/AddListModal";
import Fire from "../Fire";
import { Audio } from 'expo-av'
import * as androidIssue from "../AndroidWarning";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {FontAwesome5} from '@expo/vector-icons';


export default class Home extends React.Component {

    constructor(props)
    {
      super(props);
    

    }



    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
    };
    
    onListsReceived = (todoList) => {
      console.log(todoList)
    }

    async componentDidMount() {
      
      
        firebase = new Fire((error, user) => {
            if (error) {
                return alert("Uh oh, something went wrong");
            }
           
            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false });
                });
            });

            this.setState({ user });
        });

    }
    componentWillUnmount() {
        firebase.detach();
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    togglePlaying() {

        this.setState({ shouldPlay: !this.state.shouldPlay });
    }

    renderList = list => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    addList = list => {
        firebase.addList({
          name: list.name,
          color: list.color,
          todos: []
        })
    };

    updateList = list => {
      firebase.updateList(list); 
    };
   
    componentWillUnmount() {
      
        
        
    }

    addListPlay = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              require('../assets/fork_media_warfare_arrow_pass_by.mp3'),
              { shouldPlay: true }
            );
            // console.log("this is working.")
          } catch (error) {
           console.log("sound error", error)
          }

    }

    scrollPlay = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              require('../assets/zapsplat_cartoon_blink_shake_flutter_high_pitched_003_47921.mp3'),
              { shouldPlay: true }
            );
            // console.log("this is working.")
          } catch (error) {
           console.log("sound error", error)
          }

    }
    addTask = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              require('../assets/zapsplat_technology_computer_mouse_click_apple_003_47279.mp3'),
              { shouldPlay: true }
            );
            // console.log("this is working.")
          } catch (error) {
           console.log("sound error", error)
          }



    }

    

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            );
        }
  
        
        return (

            <View style={styles.container}>

            
                 {/* <SafeAreaView style={{flex:  1}} > */}
                    <TouchableOpacity 
                        style={{alignItems: "flex-end", margin: 16, paddingLeft: 350, paddingTop: -100}} 
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    {/* </SafeAreaView> */}
            

                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>

               
               
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        Covid<Text style={{ fontWeight: "300", color: colors.purple }}>Care</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    <TouchableOpacity 
                        style={styles.addList} 
                        onPress={() => {this.toggleAddTodoModal(); this.addListPlay(); }}>
                        <AntDesign name="plus" size={16} color={colors.purple} />
                    </TouchableOpacity>

                    <Text style={styles.add}>Add List</Text>
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}
                        onMomentumScrollBegin={() => this.scrollPlay()}
                        
                        
                         
                    />
                </View>
                {/* </SafeAreaView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: colors.purple,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.purple,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: colors.purple,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8
    }
});
import React from "react";
import { Text, View } from "react-native";


interface CellProps {
    text?: string | number;
    width: number | string;
    height?: number | string;
    textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
    backgroundColor?: "default" | "red" | "green" | "blue" | "yellow" | "white";
    color?: "default" | "white" | "black"
}

export function Cell({ text, width, height = "auto", textAlign = "left", backgroundColor = "default", color = "default" }: CellProps) {
    
    let bgColor = "#2D3748";

    switch(backgroundColor){
        case "default":{
            bgColor = "#2D3748";
            break;
        }
        case "red":{
            bgColor = "red";
            break;
        }
        case "green": {
            bgColor = "green";
            break;
        }
        case "blue": {
            bgColor = "blue";
            break;
        }
        case "yellow": {
            bgColor = "yellow";
            break;
        }
        case "white": {
            bgColor = "white";
            break;
        }
        default:{
            bgColor = "#2D3748"
            break;
        }
    }

    let colorColor = "#cbd5e0";

    switch(color){
        case "default":{
            colorColor = "#cbd5e0";
            break;
        }
        case "white":{
            colorColor = "white";
            break;
        }
        case "black": {
            colorColor = "black";
            break;
        }
        default:{
            colorColor = "#cbd5e0"
            break;
        }
    }

    return (
        <View style={{
            backgroundColor: bgColor,
            paddingLeft:7,
            paddingRight:3,
            paddingTop:5,
            paddingBottom:4,
            width: width,
            borderBottomColor:'white',
            borderBottomWidth:0.5,
            height: height,
            maxWidth: width,
            justifyContent:'center'
        }}>
            <Text style={{
                color: colorColor,
                textTransform:'uppercase',
                fontWeight:'bold',
                fontSize:10,
                flexWrap: 'wrap'
            }}>
                {text}
            </Text>
        </View>
    )
}
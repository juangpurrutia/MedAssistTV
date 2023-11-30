import { Text, TextProps } from "react-native";
import React from "react";

interface TitleProps extends TextProps {
    text: string;
}

export function Title({ text, ...rest}: TitleProps) {
    return (
        <Text 
        style={{
            fontWeight:'bold',
            color:'white',
            fontSize:15,
        }}
        {...rest}>
            {text}
        </Text>
    )
}
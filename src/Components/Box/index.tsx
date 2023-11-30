import React from "react";
import { View } from "react-native";

interface BoxProps {
    children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children }) => {
    return (
        <View
        style={{
            backgroundColor:'#1A202C',
            padding:5,
            borderRadius: 8,
        }}>
            {children}
        </View>
    )
}
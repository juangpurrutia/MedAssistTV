import React from "react";
import { Text, View } from "react-native";


interface HeaderProps {
    text: string;
    width: number | string;
    textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export function Header({ text, width, alignItems = "flex-start", textAlign = "left" }: HeaderProps) {
    return (
        <View style={{
            backgroundColor: '#171923',
            paddingLeft:7,
            paddingRight:3,
            paddingTop: 5,
            paddingBottom: 5,
            width: width,
            alignItems: alignItems
        }}>
            <Text style={{
                color: '#cbd5e0',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 8,
                textAlign: textAlign
            }}>
                {text}
            </Text>
        </View>
    )
}
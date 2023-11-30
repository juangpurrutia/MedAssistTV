import React from "react";
import { View } from "react-native";

interface RowProps {
    children: React.ReactNode;
}

export function Row({ children }: RowProps) {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            {children}
        </View>
    )
}
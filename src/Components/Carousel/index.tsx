import React, { useEffect, useState } from "react";
import { Animated, Text, View } from "react-native";


interface CarouselProps<T> {
    renderItem: (item: T) => React.ReactElement | null;
    items: T[];
    interval: number;
    textWhenEmpty?: string;
    animateCarousel?: boolean;
}


export function Carousel<T>({ renderItem, items, interval, textWhenEmpty, animateCarousel = false }: CarouselProps<T>): React.ReactElement | null {


    const [index, setIndex] = useState<number>(0);

    const initialValueContentAnim = animateCarousel ? -50 : 0;

    const [contentAnim] = useState(new Animated.Value(initialValueContentAnim));


    function animate() {
        contentAnim.setValue(-50);
        Animated.spring(contentAnim,
            {
                toValue: 0,
                speed: 20,
                bounciness: 20,
                useNativeDriver: false
            }).start();
    }


    useEffect(() => {
        const id = setInterval(() => {
            setIndex(index => {
                const length = items.length;
                if (length === 0) {
                    return -1;
                }

                if (index < length - 1) {
                    return index + 1;
                }
                else if (index === length - 1) {
                    return 0;
                }

                return 0;

            });
        }, interval);
        return () => clearInterval(id);
    }, [items])

    useEffect(() => {
        if (animateCarousel) {
            animate();
        }

    }, [index])


    const item = items[index];

    return item ? (
        <Animated.View
            style={{
                transform: [{ translateY: contentAnim }],
                flex: 1,
            }}>
            {renderItem(item)}
        </Animated.View>
    )
        : (
            <Animated.View
                style={{
                    transform: [{ translateY: contentAnim }],
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                    {textWhenEmpty}
                </Text>
            </Animated.View>
        );
}
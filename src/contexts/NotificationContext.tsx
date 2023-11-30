import { createContext, ReactNode, useEffect, useState } from "react";
import Sound from "react-native-sound";
import React from "react";

interface NotificationContextType {
    notify: () => void;
}

export const NotificationContext = createContext({} as NotificationContextType);

interface NotificationContextProviderProps {
    children: ReactNode;
}

export function NotificationContextProvider({ children }: NotificationContextProviderProps) {

    useEffect(() =>{
        notify();
    },[])


    // function notify() {
    //     try {
    //         if (sound) {
    //             sound.play(success => {
    //                 if (success) {
    //                     console.log('successfully finished playing');
    //                 } else {
    //                     console.log('playback failed due to audio decoding errors');
    //                 }
    //             });
    //         }
    //         else{
                
    //         }
    //     } catch (err) {
    //         console.log('playback failed due to audio decoding errors', err);
    //     }

    // }


    function notify(){
        try {
            Sound.setCategory('Playback');

            var ding = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                else {
                    // when loaded successfully
                    console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
                    ding.setVolume(1);
                    ding.play();
                }
            });
        } catch (err) {
            console.log('failed to load the sound', err);
        }
    }

    return (
        <NotificationContext.Provider value={{
            notify: notify
        }}>
            {children}
        </NotificationContext.Provider>
    )

} 
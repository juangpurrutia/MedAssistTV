/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import axios from 'axios'

import { QueryClientProvider } from 'react-query';
import { queryClient } from './src/services/queryCliente';
import { Home } from './src/pages/Home';
import { NotificationContextProvider } from './src/contexts/NotificationContext';
import KeepAwake from '@sayem314/react-native-keep-awake';
import { sleep } from './src/utils/sleep';

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface AppRootProps {
  children: React.ReactNode
}

function AppRoot({ children }: AppRootProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <KeepAwake />
      <NotificationContextProvider>
        {children}
      </NotificationContextProvider>
    </QueryClientProvider>
  )
}

const App = () => {

  // const headerDict = {
  //   'Cache-Control': 'no-cache',
  // }
  
  // const requestOptions = {                                                                                                                                                                                 
  //   headers: new Headers(headerDict), 
  // };

  useEffect(() => {
    try {
      queryClient.clear();

      sleep(1000).then(() => {
        queryClient.invalidateQueries();
      }).catch((err) => {
        console.log('Error when try invalidade queries', err);
      })
    } catch (err) {
      console.log('Error when try clear cache', err);
    }
  }, [])

  // const queryClient = useQueryClient()
  // const [intervalMs, setIntervalMs] = React.useState(1000)
  // const [value, setValue] = React.useState('')

  // const { status, data, error, isFetching } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const res = await axios.get('states')
  //     return res.data
  //   },
  //   // Refetch the data every second
  //   refetchInterval: intervalMs,
  // })

  // const addMutation = useMutation({
  //   mutationFn: (add) => fetch(`states?add=${add}`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  // })

  // const clearMutation = useMutation({
  //   mutationFn: () => fetch(`states?clear=1`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  // })

  //   if (status === 'loading') return <h1>Loading...</h1>
  //   if (status === 'error') return <span>Error...</span>

  return (
    <AppRoot>
      <Home />
    </AppRoot>
  );
};

export default App;

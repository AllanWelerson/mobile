import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator, FlatList, Image, Text, TouchableOpacity, RefreshControl } from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

import api from '../../services/api';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Posts = () => {

  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(10);
  const [usersTotal, setUsersTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setPosts([]);
    setUsersTotal(0);

    wait(2000).then(() => setRefreshing(false));

  }, [refreshing]);

  function navigateToDetail(post) {
    navigation.navigate('Detail', { post });
  }

  async function loadPosts(){

    if(loading){
      return;
    }

    if(total > 0 && usersTotal === total){
      return;
    }

    setLoading(true);

    let userId = usersTotal + 1;
    const response = await api.get(`posts?userId=${userId}`);

    setPosts([...posts, ...response.data]);
    setUsersTotal(userId);

    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          <Text style={styles.headerTextBold}>
            {usersTotal > 0 ? `${usersTotal} Users` : ''}
            
          </Text>
        </Text>
      </View>

      <Text style={styles.title}>JSONPlaceholder</Text>
      <Text style={styles.description}>Posts</Text>
      
      <FlatList style={styles.postList}
        data={posts}
        keyExtractor={post => String(post.id)}
        onEndReached={loadPosts}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item: post }) => (
          <View style={styles.post}>
            {/* <Text style={styles.postProperty}>User ID:</Text>
            <Text style={styles.postValue}>{post.userId}</Text> */}

            <Text style={styles.postProperty}>Titulo:</Text>
            <Text style={styles.postValue}>{post.title}</Text>

            <Text style={styles.postProperty}>Texto:</Text>
            <Text style={styles.postValue}>{post.body}</Text>

            <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigateToDetail(post)}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={17} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.loading}>
        {loading === true && refreshing === false ? <ActivityIndicator size="large" color="#8F69AC" /> : null}
      </View>
    </View>
  );
}

export default Posts;
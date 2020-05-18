import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, Linking, ScrollView, SafeAreaView} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';

const Detail = () => {

  const navigation = useNavigation();
  const message = 'Olá, Desejo entrar em contato';
  const route = useRoute();
  const [whatsappNumber, setWhatssapNumber] = useState('number');

  const post = route.params.post;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: post.title,
      recipients: [''],
      body: message
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${whatsappNumber}&text=${message}`)
  }

  return (
      <SafeAreaView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.header}>
              <Image source={logoImg}/>
              
              <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-left" size={28} color="#E82041"/>
              </TouchableOpacity>
              
            </View>

            <View style={styles.post}>
                {/* <Text style={styles.postProperty}>User ID:</Text>
                <Text style={styles.postValue}>{post.userId}</Text>

                <Text style={styles.postProperty}>ID:</Text>
                <Text style={styles.postValue}>{post.id}</Text> */}
                
                <Text style={styles.postProperty}>Titulo:</Text>
                <Text style={styles.postValue}>{post.title}</Text>

                <Text style={styles.postProperty}>Texto:</Text>
                <Text style={styles.postValue}>{post.body}</Text>
            </View>
            <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Nos envie um comentario!</Text>
              <Text style={styles.heroDescription}>Entre em contato</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                  <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendMail}>
                  <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>

  );
}

export default Detail;
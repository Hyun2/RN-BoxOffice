import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { MOVIE_API_KEY } from '../env.json'
import Title from '../components/Title'
import MovieName from '../components/MovieName';
import ListItem from '../components/ListItem';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`

const Contents = styled.ScrollView`
  flex: 1;
`

const Rank = styled.Text`
  color: grey;
  margin-right: 10px;
`

const BoxOffice = (props) => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    console.log(MOVIE_API_KEY)
    fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${MOVIE_API_KEY}&targetDt=20200728`)
      .then((data) => {
        setList(data.boxOfficeResult.dailyBoxOfficeList)
      })

    // setList(getList());
    console.log(list);
  }, [])

  return (
    <Container>
      <Contents>
        <Title>박스 오피스</Title>
        {/* <ActivityIndicator color="#0000ff" />
        <ActivityIndicator color="#0000ff" size='large' /> */}
        {list.length === 0 && <ActivityIndicator color="#0000ff" size='large' />}
        {list.map(
          (item) =>
            (<ListItem onPress={() => {
              props.navigation.navigate('MovieDetail', { movieCd: item.movieCd })
            }}
              key={item.movieCd}>
              <Rank>{item.rank}</Rank>
              <MovieName>{item.movieNm}</MovieName>
            </ListItem>)
        )}
      </Contents>

    </Container>
  )
}

export default BoxOffice;
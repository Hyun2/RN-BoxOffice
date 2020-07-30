import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { MOVIE_API_KEY } from '../env.json'

const Container = styled.SafeAreaView`
  flex: 1;
`

const Contents = styled.ScrollView`
  flex: 1;
`

const Padding = styled.View`
  padding: 24px;
`;

const Title = styled.Text`
  margin: 12px;
  font-size: 24px;
  font-weight: bold;
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-color: lightgrey;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const Rank = styled.Text`
  color: grey;
  margin-right: 10px;
`

const MovieName = styled.Text`
  font-size: 18px;

`;

const BoxOffice = () => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    console.log(MOVIE_API_KEY)
    axios.get(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${MOVIE_API_KEY}&targetDt=20200728`)
      .then(({ data }) => {
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
            (<ListItem
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
import React from 'react';
import styled from 'styled-components/native';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import axios from 'axios';
import {MOVIE_API_KEY} from '../env.json';
import {ActivityIndicator} from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid lightgrey;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;

export default (props) => {
  const [keyword, setKeyword] = React.useState('');
  const [result, setResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const search = React.useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${MOVIE_API_KEY}&movieNm=${keyword}`,
      )
      .then(({data}) => {
        setResult(data.movieListResult.movieList);
        setIsLoading(false);
        console.log(result);
      });
  }, [keyword]);

  return (
    <Container>
      <Title>영화 검색</Title>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)} />
        <Button title="검색" onPress={search} />
      </Row>
      {isLoading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        result.map((item) => (
          <ListItem
            key={item.movieCd}
            onPress={() => {
              props.navigation.navigate('MovieDetail', {movieCd: item.movieCd});
            }}>
            <MovieName>{item.movieNm}</MovieName>
          </ListItem>
        ))
      )}
    </Container>
  );
};

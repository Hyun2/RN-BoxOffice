import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { MOVIE_API_KEY } from '../env.json'
import { ActivityIndicator } from 'react-native'
import moment from 'moment';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`

const Description = styled.Text`
  font-size: 18px;
  margin: 4px 12px;
  line-height: 28px;
`

// const MovieDetail = () => {
//   return (
//     <Container>
//       <Contents>
//         <Title>영화 제목</Title>
//         <Description>설명</Description>
//       </Contents>
//     </Container>
//   )
// }

// export default MovieDetail;

const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`

const BackLabel = styled.Text`
  font-size: 18px;
  color: blue;
`

const Header = styled.View`
  height: 50px;
  border-bottom-color: grey;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
`

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export default (props) => {
  const [info, setInfo] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${MOVIE_API_KEY}&movieCd=${props.route.params.movieCd}`)
      .then((data) => {
        setInfo(data.movieInfoResult.movieInfo);
        // console.log(info);
      })
  }, [])

  return (

    <Container>
      <Header>
        <Back onPress={() => props.navigation.goBack()}>
          <BackLabel>뒤로</BackLabel>
        </Back>
        <HeaderTitle>영화 정보 조회</HeaderTitle>
      </Header>
      <Contents>
        {info === null ? (<ActivityIndicator size='large' color="#0000ff" />) :
          <>
            <Title>{info.movieNm}</Title>
            <Description>제작년도: {info.prdtYear}년</Description>
            <Description>개봉일: {moment(info.openDt, 'YYYYMMDD').format('YYYY년 MM월 DD일')}</Description>
            <Description>상영시간: {info.showTm}분</Description>
            <Description>제작국가: {info.nations.map(nation => nation.nationNm).join(', ')}</Description>
            <Description>감독: {info.directors.map(director => director.peopleNm).join(', ')}</Description>
            {info.actors.length > 0 && <Description>출연: {info.actors.map(actor => actor.peopleNm).join(', ')}</Description>}
          </>
        }
      </Contents>
    </Container>
  )
}
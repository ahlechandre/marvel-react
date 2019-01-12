import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 30px;
  color: red;
`

const Pretitle = styled.span`
  font-weight: bold;
`

const Postitle = styled.span`
  font-style: italic;
`

const Logo = () => {
  return (
    <div>
      <Title>
        <Pretitle>Marvel</Pretitle><Postitle>React</Postitle>
      </Title> 
    </div>
  )
}

export default Logo

import styled from 'styled-components';
import Button from '@mui/material/Button';
const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: px;
  width: 400px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

const BlockCard = ({ block, getTransactions, getLatestBlock }) => {
  return (
    <Card style={{ padding: '30px' }}>
      <Button
        variant="contained"
        style={{ width: '400px' }}
        onClick={getLatestBlock}
      >
        Get Latest Block
      </Button>
      <Title>
        Block Hash: {`${block.hash.slice(0, 6)}...${block.hash.slice(-4)}`}
      </Title>

      <Text>Block Number: {block.number}</Text>
      <Text>Block Timestamp: {block.timestamp}</Text>
      <Text>Block Miner: {block.miner}</Text>
      <Text>Number of Transactions in Block: {block.transactions.length}</Text>
      <Button
        variant="contained"
        onClick={getTransactions}
        style={{ width: '400px' }}
      >
        Get Block Transactions
      </Button>
    </Card>
  );
};

export default BlockCard;

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';

export default function Tx({ txData }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ color: 'blue' }}>
            {txData.transactionHash}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Block Hash: {txData.blockHash}</Typography>
          <Typography>Block Number: {txData.blockNumber}</Typography>
          {!txData.contractAddress ? (
            ''
          ) : (
            <Typography>
              {txData.contractAddress}
              <Badge
                badgeContent={'contract'}
                color="success"
                style={{ paddingLeft: '40px' }}
              />
            </Typography>
          )}
          <Typography>From: {txData.from}</Typography>
          <Typography>To: {txData.to}</Typography>
          <Typography>
            Status:
            {txData.status ? (
              <Badge
                badgeContent={'success'}
                color="success"
                style={{ paddingLeft: '40px' }}
              />
            ) : (
              ''
            )}
          </Typography>
          <Typography>Gas used: {parseInt(txData.gasUsed)}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

/*
{
    "transactionHash": "0x46a197e3272db3a9bd5dd538dd6ab97763e7373c60267b5c42fb9d49074ec580",
    "blockHash": "0x04c35f4790c89cc649f62ca77a0d79fdfb061bac4e462f4ba2b97d529bf61fb0",
    "blockNumber": "0x1085bd2",
    "logs": [
        {
            "transactionHash": "0x46a197e3272db3a9bd5dd538dd6ab97763e7373c60267b5c42fb9d49074ec580",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "blockHash": "0x04c35f4790c89cc649f62ca77a0d79fdfb061bac4e462f4ba2b97d529bf61fb0",
            "blockNumber": "0x1085bd2",
            "data": "0x0000000000000000000000000000000000000000000000000000000003ce3a6c",
            "logIndex": "0xbb",
            "removed": false,
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x00000000000000000000000024c51e78bf79e66932bb9b416ce8752900d0844f",
                "0x0000000000000000000000006f2343e71c941f81cc00fb056310e5ab21974bba"
            ],
            "transactionIndex": "0x64"
        },
        {
            "transactionHash": "0x46a197e3272db3a9bd5dd538dd6ab97763e7373c60267b5c42fb9d49074ec580",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "blockHash": "0x04c35f4790c89cc649f62ca77a0d79fdfb061bac4e462f4ba2b97d529bf61fb0",
            "blockNumber": "0x1085bd2",
            "data": "0x000000000000000000000000000000000000000000000000000000000009d737",
            "logIndex": "0xbc",
            "removed": false,
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x00000000000000000000000024c51e78bf79e66932bb9b416ce8752900d0844f",
                "0x0000000000000000000000006c8dd0e9cc58c07429e065178d88444b60e60b80"
            ],
            "transactionIndex": "0x64"
        }
    ],
    "contractAddress": null,
    "effectiveGasPrice": "0xa0b3890bf",
    "cumulativeGasUsed": "0xcc18f6",
    "from": "0x6e6af8330cc5bd12e66a227af8c1dc6ef17582b0",
    "gasUsed": "0x266b2",
    "logsBloom": "0x20000000000000000000000000000000000000000100000000000008000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000400000000000000000100000000000000000002000000280000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000002000000000000000001000000000008000000000000000000000000000000000000000000000",
    "status": "0x1",
    "to": "0x881d4032abe4188e2237efcd27ab435e81fc6bb1",
    "transactionIndex": "0x64",
    "type": "0x2"
}
*/

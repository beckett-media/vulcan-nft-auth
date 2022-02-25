import { format, subHours, subMinutes, subSeconds } from 'date-fns';
import { useState, useEffect } from "react";
import { Avatar, Box, Card, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; 
import { isIterableArray } from '../utils/is-iterable';
import { LinearProgress } from '@mui/material';



const now = new Date();


const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative'
});

export const NftCards = () => {

    const [rawNfts, setRawNfts] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [nftDetails, setNftDetails] = useState([]);

     //FIRST API CALL
     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(
                    'http://52.32.36.9:3000/nfts'
                );
                setRawNfts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const exec = async () => {
          const _nftDetails = await Promise.all(rawNfts.map(obj => {
            return axios.get('http://52.32.36.9:3000/nfts/' + obj.contract + '?id=' +obj.id)
          }))
          setNftDetails(_nftDetails.map(({data}) => data[0]));
        };
        exec();
     }, [rawNfts]);
     
     function getIndex(contract, id) {
        return rawNfts.findIndex(obj => obj.contract === contract &&  obj.id === id );
    }

     useEffect(() => {
         
        if (isIterableArray(nftDetails)) {
            let newNfts = []
            nftDetails.map(function(val, i, array){
                let thisNewNft = rawNfts[i];
                thisNewNft['status']=val['status'];
                newNfts.push(thisNewNft);
              });
            setNfts(newNfts);
        }
        
            
     }, [nftDetails]);
     


    
    return (
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            p: 3
          }}
        >
             {!isIterableArray(nfts)    ? <LinearProgress /> : <h1></h1>}
          <Grid
            container
            spacing={3}
          >
            {!isIterableArray(nfts)    ? <LinearProgress /> : nfts.map((nft) => (
              <Grid
                item
                key={nft.id + nft.contract}
                md={4}
                xs={12}
              >
                <Card
                  sx={{
                    height: '100%',
                    p: 2
                  }}
                >
                  <BlogPostCardMediaWrapper>
                    <CardMedia
                      image={nft.image_url}
                      sx={{
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        width: '100%'
                      }}
                    />
                  </BlogPostCardMediaWrapper>
                  <Box sx={{ mt: 2 }}>
                    <div>
                      
                      <Box component="div" sx={{ display: 'inline', mr: 1}} >
                       {(() => {
                            if (nft.status==0) {
                            return (
                                <Chip label="Non-existent" color="default" variant="outlined" />
                            )
                            } else if (nft.status==1) {
                            return (
                                <Chip label="Authentic" color="info" variant="outlined" />
                            )
                            } else if (nft.status==2) {
                            return (
                                <Chip label="Fake" color="error" variant="outlined" />
                            )
                            }else if (nft.status==3) {
                                return (
                                    <Chip label="Burned" color="warning" variant="outlined" />
                                )
                            }
                        })()}
                            
                       </Box>

                       <Chip
                        label={nft.symbol}
                        variant="outlined"
                      />


                    </div>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        my: 2
                      }}
                    >
                      
                    </Box>
                    <Typography variant="h5">
                      {nft.collection}
                       <Box component="div" sx={{ display: 'inline', ml: 1}} >
                       {(() => {
                            if (nft.status==0) {
                            return (
                                <img src="/static/beckett/no-entry.png" height='20' width='20' />
                            )
                            } else if (nft.status==1) {
                            return (
                                <img src="/static/beckett/verified-badge.png" height='20' width='20' />
                            )
                            } else if (nft.status==2) {
                            return (
                                <img src="/static/beckett/error-badge.png" height='20' width='20' />
                            )
                            }else if (nft.status==3) {
                                return (
                                    <img src="/static/beckett/deleted-badge.png" height='20' width='20' />
                                )
                            }
                        })()}
                            
                       </Box>
                       
                      
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        height: 72,
                        mt: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2
                      }}
                      variant="body1"
                    >
                      {nft.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
}

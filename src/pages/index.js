import { useEffect } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { WidgetPreviewer } from "../components/widget-previewer";
import { NftCards } from "../components/nft-cards";
import { GridList2 } from "../components/widgets/grid-lists/grid-list-2";

import { DashboardLayout } from '../components/dashboard/dashboard-layout';

import { gtm } from "../lib/gtm";

const BrowseNfts = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Beckett: NFT Authentication</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <NftCards
          />
          {/* <GridList2
          /> */}
        </Container>
      </Box>
    </>
  );
};

BrowseNfts.getLayout = (page) => (

    <DashboardLayout>
      {page}
    </DashboardLayout>

);


export default BrowseNfts;

import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal';
import styles from '../styles/globals.module.scss';
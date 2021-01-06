import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../QuestionHelper'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useGetWyreObject } from '../../state/price/hooks'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.modalFooterBG};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export function BuyFooter() {
  const { t } = useTranslation()
  const wyreObject = useGetWyreObject()
  const priceObject = Boolean(wyreObject.priceResponse) ? wyreObject.priceResponse : false
  const showFootermodal = priceObject
  const outputCurrency = priceObject ? priceObject.destCurrency : 'ETH'
  const outputAmount = priceObject ? priceObject.destAmount.toFixed(6).replace(/\.?0*$/, '') : '0'
  const ethPrice = priceObject ? (1 / priceObject.destAmount) * priceObject.sourceAmountWithoutFees : 0
  const convertedEthPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ethPrice)
  const transactionFee = priceObject ? priceObject.fees.USD : 0
  const convertedTransactionFee = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    transactionFee
  )
  const networkFee = priceObject ? priceObject.fees.ETH * ethPrice : 0
  const convertedNetworkFee = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(networkFee)
  const total = priceObject ? priceObject.sourceAmount : 0
  const convertedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)

  return (
    <AdvancedDetailsFooter show={showFootermodal}>
      <AutoColumn gap="md" style={{ padding: '0 24px' }}>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400}>
              {t('currentWyreEthPrice')}
            </TYPE.black>
            <QuestionHelper text={t('wyrePriceDescription')} />
          </RowFixed>
          {convertedEthPrice}
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400}>
              {t('estimatedCurrencyOutput', { currency: outputCurrency })}
            </TYPE.black>
          </RowFixed>
          {outputAmount}
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400}>
              {t('transactionFee')}
            </TYPE.black>
            <QuestionHelper text={t('transactionFeeDescription')} />
          </RowFixed>
          {convertedTransactionFee}
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400}>
              {t('networkFee')}
            </TYPE.black>
            <QuestionHelper text={t('networkFeeDescription')} />
          </RowFixed>
          {convertedNetworkFee}
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={16} fontWeight={600}>
              {t('buyTotal')}
            </TYPE.black>
            <QuestionHelper text={t('buyTotalDescription')} />
          </RowFixed>
          <TYPE.black fontSize={16} fontWeight={600}>
            ~{convertedTotal}
          </TYPE.black>
        </RowBetween>
      </AutoColumn>
    </AdvancedDetailsFooter>
  )
}
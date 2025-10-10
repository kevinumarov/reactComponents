import type { ApexOptions } from 'apexcharts'

function generateDayWiseTimeSeries(baseval: number, count: number, yrange: { max: number; min: number }): any[] {
  let i = 0
  const series = []
  while (i < count) {
    const x = baseval
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push([x, y])
    baseval += 86400000
    i++
  }
  return series
}

const dataSeries = [
  [
    {
      date: '2014-01-01',
      value: 20000000,
    },
    {
      date: '2014-01-02',
      value: 10379978,
    },
    {
      date: '2014-01-03',
      value: 30493749,
    },
    {
      date: '2014-01-04',
      value: 10785250,
    },
    {
      date: '2014-01-05',
      value: 33901904,
    },
    {
      date: '2014-01-06',
      value: 11576838,
    },
    {
      date: '2014-01-07',
      value: 14413854,
    },
    {
      date: '2014-01-08',
      value: 15177211,
    },
    {
      date: '2014-01-09',
      value: 16622100,
    },
    {
      date: '2014-01-10',
      value: 17381072,
    },
    {
      date: '2014-01-11',
      value: 18802310,
    },
    {
      date: '2014-01-12',
      value: 15531790,
    },
    {
      date: '2014-01-13',
      value: 15748881,
    },
    {
      date: '2014-01-14',
      value: 18706437,
    },
    {
      date: '2014-01-15',
      value: 19752685,
    },
    {
      date: '2014-01-16',
      value: 21016418,
    },
    {
      date: '2014-01-17',
      value: 25622924,
    },
    {
      date: '2014-01-18',
      value: 25337480,
    },
    {
      date: '2014-01-19',
      value: 22258882,
    },
    {
      date: '2014-01-20',
      value: 23829538,
    },
    {
      date: '2014-01-21',
      value: 24245689,
    },
    {
      date: '2014-01-22',
      value: 26429711,
    },
    {
      date: '2014-01-23',
      value: 26259017,
    },
    {
      date: '2014-01-24',
      value: 25396183,
    },
    {
      date: '2014-01-25',
      value: 23107346,
    },
    {
      date: '2014-01-26',
      value: 28659852,
    },
    {
      date: '2014-01-27',
      value: 25270783,
    },
    {
      date: '2014-01-28',
      value: 26270783,
    },
    {
      date: '2014-01-29',
      value: 27270783,
    },
    {
      date: '2014-01-30',
      value: 28270783,
    },
    {
      date: '2014-01-31',
      value: 29270783,
    },
    {
      date: '2014-02-01',
      value: 30270783,
    },
    {
      date: '2014-02-02',
      value: 31270783,
    },
    {
      date: '2014-02-03',
      value: 32270783,
    },
    {
      date: '2014-02-04',
      value: 33270783,
    },
    {
      date: '2014-02-05',
      value: 28270783,
    },
    {
      date: '2014-02-06',
      value: 27270783,
    },
    {
      date: '2014-02-07',
      value: 35270783,
    },
    {
      date: '2014-02-08',
      value: 34270783,
    },
    {
      date: '2014-02-09',
      value: 28270783,
    },
    {
      date: '2014-02-10',
      value: 35270783,
    },
    {
      date: '2014-02-11',
      value: 36270783,
    },
    {
      date: '2014-02-12',
      value: 34127078,
    },
    {
      date: '2014-02-13',
      value: 33124078,
    },
    {
      date: '2014-02-14',
      value: 36227078,
    },
    {
      date: '2014-02-15',
      value: 37827078,
    },
    {
      date: '2014-02-16',
      value: 36427073,
    },
    {
      date: '2014-02-17',
      value: 37570783,
    },
    {
      date: '2014-02-18',
      value: 38627073,
    },
    {
      date: '2014-02-19',
      value: 37727078,
    },
    {
      date: '2014-02-20',
      value: 38827073,
    },
    {
      date: '2014-02-21',
      value: 40927078,
    },
    {
      date: '2014-02-22',
      value: 41027078,
    },
    {
      date: '2014-02-23',
      value: 42127073,
    },
    {
      date: '2014-02-24',
      value: 43220783,
    },
    {
      date: '2014-02-25',
      value: 44327078,
    },
    {
      date: '2014-02-26',
      value: 40427078,
    },
    {
      date: '2014-02-27',
      value: 41027078,
    },
    {
      date: '2014-02-28',
      value: 45627078,
    },
    {
      date: '2014-03-01',
      value: 44727078,
    },
    {
      date: '2014-03-02',
      value: 44227078,
    },
    {
      date: '2014-03-03',
      value: 45227078,
    },
    {
      date: '2014-03-04',
      value: 46027078,
    },
    {
      date: '2014-03-05',
      value: 46927078,
    },
    {
      date: '2014-03-06',
      value: 47027078,
    },
    {
      date: '2014-03-07',
      value: 46227078,
    },
    {
      date: '2014-03-08',
      value: 47027078,
    },
    {
      date: '2014-03-09',
      value: 48027078,
    },
    {
      date: '2014-03-10',
      value: 47027078,
    },
    {
      date: '2014-03-11',
      value: 47027078,
    },
    {
      date: '2014-03-12',
      value: 48017078,
    },
    {
      date: '2014-03-13',
      value: 48077078,
    },
    {
      date: '2014-03-14',
      value: 48087078,
    },
    {
      date: '2014-03-15',
      value: 48017078,
    },
    {
      date: '2014-03-16',
      value: 48047078,
    },
    {
      date: '2014-03-17',
      value: 48067078,
    },
    {
      date: '2014-03-18',
      value: 48077078,
    },
    {
      date: '2014-03-19',
      value: 48027074,
    },
    {
      date: '2014-03-20',
      value: 48927079,
    },
    {
      date: '2014-03-21',
      value: 48727071,
    },
    {
      date: '2014-03-22',
      value: 48127072,
    },
    {
      date: '2014-03-23',
      value: 48527072,
    },
    {
      date: '2014-03-24',
      value: 48627027,
    },
    {
      date: '2014-03-25',
      value: 48027040,
    },
    {
      date: '2014-03-26',
      value: 48027043,
    },
    {
      date: '2014-03-27',
      value: 48057022,
    },
    {
      date: '2014-03-28',
      value: 49057022,
    },
    {
      date: '2014-03-29',
      value: 50057022,
    },
    {
      date: '2014-03-30',
      value: 51057022,
    },
    {
      date: '2014-03-31',
      value: 52057022,
    },
    {
      date: '2014-04-01',
      value: 53057022,
    },
    {
      date: '2014-04-02',
      value: 54057022,
    },
    {
      date: '2014-04-03',
      value: 52057022,
    },
    {
      date: '2014-04-04',
      value: 55057022,
    },
    {
      date: '2014-04-05',
      value: 58270783,
    },
    {
      date: '2014-04-06',
      value: 56270783,
    },
    {
      date: '2014-04-07',
      value: 55270783,
    },
    {
      date: '2014-04-08',
      value: 58270783,
    },
    {
      date: '2014-04-09',
      value: 59270783,
    },
    {
      date: '2014-04-10',
      value: 60270783,
    },
    {
      date: '2014-04-11',
      value: 61270783,
    },
    {
      date: '2014-04-12',
      value: 62270783,
    },
    {
      date: '2014-04-13',
      value: 63270783,
    },
    {
      date: '2014-04-14',
      value: 64270783,
    },
    {
      date: '2014-04-15',
      value: 65270783,
    },
    {
      date: '2014-04-16',
      value: 66270783,
    },
    {
      date: '2014-04-17',
      value: 67270783,
    },
    {
      date: '2014-04-18',
      value: 68270783,
    },
    {
      date: '2014-04-19',
      value: 69270783,
    },
    {
      date: '2014-04-20',
      value: 70270783,
    },
    {
      date: '2014-04-21',
      value: 71270783,
    },
    {
      date: '2014-04-22',
      value: 72270783,
    },
    {
      date: '2014-04-23',
      value: 73270783,
    },
    {
      date: '2014-04-24',
      value: 74270783,
    },
    {
      date: '2014-04-25',
      value: 75270783,
    },
    {
      date: '2014-04-26',
      value: 76660783,
    },
    {
      date: '2014-04-27',
      value: 77270783,
    },
    {
      date: '2014-04-28',
      value: 78370783,
    },
    {
      date: '2014-04-29',
      value: 79470783,
    },
    {
      date: '2014-04-30',
      value: 80170783,
    },
  ],
  [
    {
      date: '2014-01-01',
      value: 150000000,
    },
    {
      date: '2014-01-02',
      value: 160379978,
    },
    {
      date: '2014-01-03',
      value: 170493749,
    },
    {
      date: '2014-01-04',
      value: 160785250,
    },
    {
      date: '2014-01-05',
      value: 167391904,
    },
    {
      date: '2014-01-06',
      value: 161576838,
    },
    {
      date: '2014-01-07',
      value: 161413854,
    },
    {
      date: '2014-01-08',
      value: 152177211,
    },
    {
      date: '2014-01-09',
      value: 140762210,
    },
    {
      date: '2014-01-10',
      value: 144381072,
    },
    {
      date: '2014-01-11',
      value: 154352310,
    },
    {
      date: '2014-01-12',
      value: 165531790,
    },
    {
      date: '2014-01-13',
      value: 175748881,
    },
    {
      date: '2014-01-14',
      value: 187064037,
    },
    {
      date: '2014-01-15',
      value: 197520685,
    },
    {
      date: '2014-01-16',
      value: 210176418,
    },
    {
      date: '2014-01-17',
      value: 196122924,
    },
    {
      date: '2014-01-18',
      value: 207337480,
    },
    {
      date: '2014-01-19',
      value: 200258882,
    },
    {
      date: '2014-01-20',
      value: 186829538,
    },
    {
      date: '2014-01-21',
      value: 192456897,
    },
    {
      date: '2014-01-22',
      value: 204299711,
    },
    {
      date: '2014-01-23',
      value: 192759017,
    },
    {
      date: '2014-01-24',
      value: 203596183,
    },
    {
      date: '2014-01-25',
      value: 208107346,
    },
    {
      date: '2014-01-26',
      value: 196359852,
    },
    {
      date: '2014-01-27',
      value: 192570783,
    },
    {
      date: '2014-01-28',
      value: 177967768,
    },
    {
      date: '2014-01-29',
      value: 190632803,
    },
    {
      date: '2014-01-30',
      value: 203725316,
    },
    {
      date: '2014-01-31',
      value: 218226177,
    },
    {
      date: '2014-02-01',
      value: 210698669,
    },
    {
      date: '2014-02-02',
      value: 217640656,
    },
    {
      date: '2014-02-03',
      value: 216142362,
    },
    {
      date: '2014-02-04',
      value: 201410971,
    },
    {
      date: '2014-02-05',
      value: 196704289,
    },
    {
      date: '2014-02-06',
      value: 190436945,
    },
    {
      date: '2014-02-07',
      value: 178891686,
    },
    {
      date: '2014-02-08',
      value: 171613962,
    },
    {
      date: '2014-02-09',
      value: 157579773,
    },
    {
      date: '2014-02-10',
      value: 158677098,
    },
    {
      date: '2014-02-11',
      value: 147129977,
    },
    {
      date: '2014-02-12',
      value: 151561876,
    },
    {
      date: '2014-02-13',
      value: 151627421,
    },
    {
      date: '2014-02-14',
      value: 143543872,
    },
    {
      date: '2014-02-15',
      value: 136581057,
    },
    {
      date: '2014-02-16',
      value: 135560715,
    },
    {
      date: '2014-02-17',
      value: 122625263,
    },
    {
      date: '2014-02-18',
      value: 112091484,
    },
    {
      date: '2014-02-19',
      value: 98810329,
    },
    {
      date: '2014-02-20',
      value: 99882912,
    },
    {
      date: '2014-02-21',
      value: 94943095,
    },
    {
      date: '2014-02-22',
      value: 104875743,
    },
    {
      date: '2014-02-23',
      value: 116383678,
    },
    {
      date: '2014-02-24',
      value: 125028841,
    },
    {
      date: '2014-02-25',
      value: 123967310,
    },
    {
      date: '2014-02-26',
      value: 133167029,
    },
    {
      date: '2014-02-27',
      value: 128577263,
    },
    {
      date: '2014-02-28',
      value: 115836969,
    },
    {
      date: '2014-03-01',
      value: 119264529,
    },
    {
      date: '2014-03-02',
      value: 109363374,
    },
    {
      date: '2014-03-03',
      value: 113985628,
    },
    {
      date: '2014-03-04',
      value: 114650999,
    },
    {
      date: '2014-03-05',
      value: 110866108,
    },
    {
      date: '2014-03-06',
      value: 96473454,
    },
    {
      date: '2014-03-07',
      value: 104075886,
    },
    {
      date: '2014-03-08',
      value: 103568384,
    },
    {
      date: '2014-03-09',
      value: 101534883,
    },
    {
      date: '2014-03-10',
      value: 115825447,
    },
    {
      date: '2014-03-11',
      value: 126133916,
    },
    {
      date: '2014-03-12',
      value: 116502109,
    },
    {
      date: '2014-03-13',
      value: 130169411,
    },
    {
      date: '2014-03-14',
      value: 124296886,
    },
    {
      date: '2014-03-15',
      value: 126347399,
    },
    {
      date: '2014-03-16',
      value: 131483669,
    },
    {
      date: '2014-03-17',
      value: 142811333,
    },
    {
      date: '2014-03-18',
      value: 129675396,
    },
    {
      date: '2014-03-19',
      value: 115514483,
    },
    {
      date: '2014-03-20',
      value: 117630630,
    },
    {
      date: '2014-03-21',
      value: 122340239,
    },
    {
      date: '2014-03-22',
      value: 132349091,
    },
    {
      date: '2014-03-23',
      value: 125613305,
    },
    {
      date: '2014-03-24',
      value: 135592466,
    },
    {
      date: '2014-03-25',
      value: 123408762,
    },
    {
      date: '2014-03-26',
      value: 111991454,
    },
    {
      date: '2014-03-27',
      value: 116123955,
    },
    {
      date: '2014-03-28',
      value: 112817214,
    },
    {
      date: '2014-03-29',
      value: 113029590,
    },
    {
      date: '2014-03-30',
      value: 108753398,
    },
    {
      date: '2014-03-31',
      value: 99383763,
    },
    {
      date: '2014-04-01',
      value: 100151737,
    },
    {
      date: '2014-04-02',
      value: 94985209,
    },
    {
      date: '2014-04-03',
      value: 82913669,
    },
    {
      date: '2014-04-04',
      value: 78748268,
    },
    {
      date: '2014-04-05',
      value: 63829135,
    },
    {
      date: '2014-04-06',
      value: 78694727,
    },
    {
      date: '2014-04-07',
      value: 80868994,
    },
    {
      date: '2014-04-08',
      value: 93799013,
    },
    {
      date: '2014-04-09',
      value: 99042416,
    },
    {
      date: '2014-04-10',
      value: 97298692,
    },
    {
      date: '2014-04-11',
      value: 83353499,
    },
    {
      date: '2014-04-12',
      value: 71248129,
    },
    {
      date: '2014-04-13',
      value: 75253744,
    },
    {
      date: '2014-04-14',
      value: 68976648,
    },
    {
      date: '2014-04-15',
      value: 71002284,
    },
    {
      date: '2014-04-16',
      value: 75052401,
    },
    {
      date: '2014-04-17',
      value: 83894030,
    },
    {
      date: '2014-04-18',
      value: 90236528,
    },
    {
      date: '2014-04-19',
      value: 99739114,
    },
    {
      date: '2014-04-20',
      value: 96407136,
    },
    {
      date: '2014-04-21',
      value: 108323177,
    },
    {
      date: '2014-04-22',
      value: 101578914,
    },
    {
      date: '2014-04-23',
      value: 115877608,
    },
    {
      date: '2014-04-24',
      value: 112088857,
    },
    {
      date: '2014-04-25',
      value: 112071353,
    },
    {
      date: '2014-04-26',
      value: 101790062,
    },
    {
      date: '2014-04-27',
      value: 115003761,
    },
    {
      date: '2014-04-28',
      value: 120457727,
    },
    {
      date: '2014-04-29',
      value: 118253926,
    },
    {
      date: '2014-04-30',
      value: 117956992,
    },
  ],
  [
    {
      date: '2014-01-01',
      value: 50000000,
    },
    {
      date: '2014-01-02',
      value: 60379978,
    },
    {
      date: '2014-01-03',
      value: 40493749,
    },
    {
      date: '2014-01-04',
      value: 60785250,
    },
    {
      date: '2014-01-05',
      value: 67391904,
    },
    {
      date: '2014-01-06',
      value: 61576838,
    },
    {
      date: '2014-01-07',
      value: 61413854,
    },
    {
      date: '2014-01-08',
      value: 82177211,
    },
    {
      date: '2014-01-09',
      value: 103762210,
    },
    {
      date: '2014-01-10',
      value: 84381072,
    },
    {
      date: '2014-01-11',
      value: 54352310,
    },
    {
      date: '2014-01-12',
      value: 65531790,
    },
    {
      date: '2014-01-13',
      value: 75748881,
    },
    {
      date: '2014-01-14',
      value: 47064037,
    },
    {
      date: '2014-01-15',
      value: 67520685,
    },
    {
      date: '2014-01-16',
      value: 60176418,
    },
    {
      date: '2014-01-17',
      value: 66122924,
    },
    {
      date: '2014-01-18',
      value: 57337480,
    },
    {
      date: '2014-01-19',
      value: 100258882,
    },
    {
      date: '2014-01-20',
      value: 46829538,
    },
    {
      date: '2014-01-21',
      value: 92456897,
    },
    {
      date: '2014-01-22',
      value: 94299711,
    },
    {
      date: '2014-01-23',
      value: 62759017,
    },
    {
      date: '2014-01-24',
      value: 103596183,
    },
    {
      date: '2014-01-25',
      value: 108107346,
    },
    {
      date: '2014-01-26',
      value: 66359852,
    },
    {
      date: '2014-01-27',
      value: 62570783,
    },
    {
      date: '2014-01-28',
      value: 77967768,
    },
    {
      date: '2014-01-29',
      value: 60632803,
    },
    {
      date: '2014-01-30',
      value: 103725316,
    },
    {
      date: '2014-01-31',
      value: 98226177,
    },
    {
      date: '2014-02-01',
      value: 60698669,
    },
    {
      date: '2014-02-02',
      value: 67640656,
    },
    {
      date: '2014-02-03',
      value: 66142362,
    },
    {
      date: '2014-02-04',
      value: 101410971,
    },
    {
      date: '2014-02-05',
      value: 66704289,
    },
    {
      date: '2014-02-06',
      value: 60436945,
    },
    {
      date: '2014-02-07',
      value: 78891686,
    },
    {
      date: '2014-02-08',
      value: 71613962,
    },
    {
      date: '2014-02-09',
      value: 107579773,
    },
    {
      date: '2014-02-10',
      value: 58677098,
    },
    {
      date: '2014-02-11',
      value: 87129977,
    },
    {
      date: '2014-02-12',
      value: 51561876,
    },
    {
      date: '2014-02-13',
      value: 51627421,
    },
    {
      date: '2014-02-14',
      value: 83543872,
    },
    {
      date: '2014-02-15',
      value: 66581057,
    },
    {
      date: '2014-02-16',
      value: 65560715,
    },
    {
      date: '2014-02-17',
      value: 62625263,
    },
    {
      date: '2014-02-18',
      value: 92091484,
    },
    {
      date: '2014-02-19',
      value: 48810329,
    },
    {
      date: '2014-02-20',
      value: 49882912,
    },
    {
      date: '2014-02-21',
      value: 44943095,
    },
    {
      date: '2014-02-22',
      value: 104875743,
    },
    {
      date: '2014-02-23',
      value: 96383678,
    },
    {
      date: '2014-02-24',
      value: 105028841,
    },
    {
      date: '2014-02-25',
      value: 63967310,
    },
    {
      date: '2014-02-26',
      value: 63167029,
    },
    {
      date: '2014-02-27',
      value: 68577263,
    },
    {
      date: '2014-02-28',
      value: 95836969,
    },
    {
      date: '2014-03-01',
      value: 99264529,
    },
    {
      date: '2014-03-02',
      value: 109363374,
    },
    {
      date: '2014-03-03',
      value: 93985628,
    },
    {
      date: '2014-03-04',
      value: 94650999,
    },
    {
      date: '2014-03-05',
      value: 90866108,
    },
    {
      date: '2014-03-06',
      value: 46473454,
    },
    {
      date: '2014-03-07',
      value: 84075886,
    },
    {
      date: '2014-03-08',
      value: 103568384,
    },
    {
      date: '2014-03-09',
      value: 101534883,
    },
    {
      date: '2014-03-10',
      value: 95825447,
    },
    {
      date: '2014-03-11',
      value: 66133916,
    },
    {
      date: '2014-03-12',
      value: 96502109,
    },
    {
      date: '2014-03-13',
      value: 80169411,
    },
    {
      date: '2014-03-14',
      value: 84296886,
    },
    {
      date: '2014-03-15',
      value: 86347399,
    },
    {
      date: '2014-03-16',
      value: 31483669,
    },
    {
      date: '2014-03-17',
      value: 82811333,
    },
    {
      date: '2014-03-18',
      value: 89675396,
    },
    {
      date: '2014-03-19',
      value: 95514483,
    },
    {
      date: '2014-03-20',
      value: 97630630,
    },
    {
      date: '2014-03-21',
      value: 62340239,
    },
    {
      date: '2014-03-22',
      value: 62349091,
    },
    {
      date: '2014-03-23',
      value: 65613305,
    },
    {
      date: '2014-03-24',
      value: 65592466,
    },
    {
      date: '2014-03-25',
      value: 63408762,
    },
    {
      date: '2014-03-26',
      value: 91991454,
    },
    {
      date: '2014-03-27',
      value: 96123955,
    },
    {
      date: '2014-03-28',
      value: 92817214,
    },
    {
      date: '2014-03-29',
      value: 93029590,
    },
    {
      date: '2014-03-30',
      value: 108753398,
    },
    {
      date: '2014-03-31',
      value: 49383763,
    },
    {
      date: '2014-04-01',
      value: 100151737,
    },
    {
      date: '2014-04-02',
      value: 44985209,
    },
    {
      date: '2014-04-03',
      value: 52913669,
    },
    {
      date: '2014-04-04',
      value: 48748268,
    },
    {
      date: '2014-04-05',
      value: 23829135,
    },
    {
      date: '2014-04-06',
      value: 58694727,
    },
    {
      date: '2014-04-07',
      value: 50868994,
    },
    {
      date: '2014-04-08',
      value: 43799013,
    },
    {
      date: '2014-04-09',
      value: 4042416,
    },
    {
      date: '2014-04-10',
      value: 47298692,
    },
    {
      date: '2014-04-11',
      value: 53353499,
    },
    {
      date: '2014-04-12',
      value: 71248129,
    },
    {
      date: '2014-04-13',
      value: 75253744,
    },
    {
      date: '2014-04-14',
      value: 68976648,
    },
    {
      date: '2014-04-15',
      value: 71002284,
    },
    {
      date: '2014-04-16',
      value: 75052401,
    },
    {
      date: '2014-04-17',
      value: 83894030,
    },
    {
      date: '2014-04-18',
      value: 50236528,
    },
    {
      date: '2014-04-19',
      value: 59739114,
    },
    {
      date: '2014-04-20',
      value: 56407136,
    },
    {
      date: '2014-04-21',
      value: 108323177,
    },
    {
      date: '2014-04-22',
      value: 101578914,
    },
    {
      date: '2014-04-23',
      value: 95877608,
    },
    {
      date: '2014-04-24',
      value: 62088857,
    },
    {
      date: '2014-04-25',
      value: 92071353,
    },
    {
      date: '2014-04-26',
      value: 81790062,
    },
    {
      date: '2014-04-27',
      value: 105003761,
    },
    {
      date: '2014-04-28',
      value: 100457727,
    },
    {
      date: '2014-04-29',
      value: 98253926,
    },
    {
      date: '2014-04-30',
      value: 67956992,
    },
  ],
]
//Irregular TimeSeries
let ts1 = 1388534400000
let ts2 = 1388620800000
let ts3 = 1389052800000

const dataSet: any = [[], [], []]

for (let i = 0; i < 12; i++) {
  ts1 = ts1 + 86400000
  const innerArr = [ts1, dataSeries[2][i].value]
  dataSet[0].push(innerArr)
}
for (let i = 0; i < 18; i++) {
  ts2 = ts2 + 86400000
  const innerArr = [ts2, dataSeries[1][i].value]
  dataSet[1].push(innerArr)
}
for (let i = 0; i < 12; i++) {
  ts3 = ts3 + 86400000
  const innerArr = [ts3, dataSeries[0][i].value]
  dataSet[2].push(innerArr)
}

const series = {
  monthDataSeries1: {
    prices: [
      8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25,
      8600.65, 8881.1, 9340.85,
    ],
    dates: [
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
      '29 Nov 2017',
      '30 Nov 2017',
      '01 Dec 2017',
      '04 Dec 2017',
      '05 Dec 2017',
      '06 Dec 2017',
      '07 Dec 2017',
      '08 Dec 2017',
    ],
  },
  monthDataSeries2: {
    prices: [
      8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7, 8165.5,
      8122.9, 8107.85, 8128.0,
    ],
    dates: [
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
      '29 Nov 2017',
      '30 Nov 2017',
      '01 Dec 2017',
      '04 Dec 2017',
      '05 Dec 2017',
      '06 Dec 2017',
      '07 Dec 2017',
      '08 Dec 2017',
    ],
  },
  monthDataSeries3: {
    prices: [
      7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95, 7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2,
      7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2, 7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45, 7560.9,
      7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95, 7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2, 7580.45, 7452.85,
      7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45, 7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75, 7816.3, 7851.15, 7912.2,
      7972.8, 8145.0, 8161.1, 8121.05, 8071.25, 8088.2, 8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55, 7733.9, 7897.15, 7973.15, 7888.5,
      7842.8, 7838.4, 7909.85, 7892.75, 7897.75, 7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35, 7819.4, 7875.35, 7871.8, 8076.5, 8114.8,
      8193.55, 8217.1, 8235.05, 8215.3, 8216.4, 8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5,
      8514.3, 8481.85, 8487.7, 8506.9, 8626.2,
    ],
    dates: [
      '02 Jun 2017',
      '05 Jun 2017',
      '06 Jun 2017',
      '07 Jun 2017',
      '08 Jun 2017',
      '09 Jun 2017',
      '12 Jun 2017',
      '13 Jun 2017',
      '14 Jun 2017',
      '15 Jun 2017',
      '16 Jun 2017',
      '19 Jun 2017',
      '20 Jun 2017',
      '21 Jun 2017',
      '22 Jun 2017',
      '23 Jun 2017',
      '27 Jun 2017',
      '28 Jun 2017',
      '29 Jun 2017',
      '30 Jun 2017',
      '03 Jul 2017',
      '04 Jul 2017',
      '05 Jul 2017',
      '06 Jul 2017',
      '07 Jul 2017',
      '10 Jul 2017',
      '11 Jul 2017',
      '12 Jul 2017',
      '13 Jul 2017',
      '14 Jul 2017',
      '17 Jul 2017',
      '18 Jul 2017',
      '19 Jul 2017',
      '20 Jul 2017',
      '21 Jul 2017',
      '24 Jul 2017',
      '25 Jul 2017',
      '26 Jul 2017',
      '27 Jul 2017',
      '28 Jul 2017',
      '31 Jul 2017',
      '01 Aug 2017',
      '02 Aug 2017',
      '03 Aug 2017',
      '04 Aug 2017',
      '07 Aug 2017',
      '08 Aug 2017',
      '09 Aug 2017',
      '10 Aug 2017',
      '11 Aug 2017',
      '14 Aug 2017',
      '16 Aug 2017',
      '17 Aug 2017',
      '18 Aug 2017',
      '21 Aug 2017',
      '22 Aug 2017',
      '23 Aug 2017',
      '24 Aug 2017',
      '28 Aug 2017',
      '29 Aug 2017',
      '30 Aug 2017',
      '31 Aug 2017',
      '01 Sep 2017',
      '04 Sep 2017',
      '05 Sep 2017',
      '06 Sep 2017',
      '07 Sep 2017',
      '08 Sep 2017',
      '11 Sep 2017',
      '12 Sep 2017',
      '13 Sep 2017',
      '14 Sep 2017',
      '15 Sep 2017',
      '18 Sep 2017',
      '19 Sep 2017',
      '20 Sep 2017',
      '21 Sep 2017',
      '22 Sep 2017',
      '25 Sep 2017',
      '26 Sep 2017',
      '27 Sep 2017',
      '28 Sep 2017',
      '29 Sep 2017',
      '03 Oct 2017',
      '04 Oct 2017',
      '05 Oct 2017',
      '06 Oct 2017',
      '09 Oct 2017',
      '10 Oct 2017',
      '11 Oct 2017',
      '12 Oct 2017',
      '13 Oct 2017',
      '16 Oct 2017',
      '17 Oct 2017',
      '18 Oct 2017',
      '19 Oct 2017',
      '23 Oct 2017',
      '24 Oct 2017',
      '25 Oct 2017',
      '26 Oct 2017',
      '27 Oct 2017',
      '30 Oct 2017',
      '31 Oct 2017',
      '01 Nov 2017',
      '02 Nov 2017',
      '03 Nov 2017',
      '06 Nov 2017',
      '07 Nov 2017',
      '08 Nov 2017',
      '09 Nov 2017',
      '10 Nov 2017',
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
    ],
  },
}

// NPS Survey Data
const npsData = {
  scores: [42, 38, 45, 51, 49, 55, 58, 62, 59, 65, 68, 71, 69, 73, 76, 74, 78, 81, 79, 83],
  dates: [
    'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
    'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
    'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
    'Jul 2024', 'Aug 2024'
  ]
}

export const basicChartOpts: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 380,
    type: 'area',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  colors: ['#22c55e'],
  series: [
    {
      name: 'NPS Score',
      data: npsData.scores,
    },
  ],
  title: {
    text: 'Net Promoter Score Trends',
    align: 'left',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Customer Loyalty & Satisfaction Tracking',
    align: 'left',
    style: {
      fontSize: '14px',
      color: '#6b7280',
    },
  },
  labels: npsData.dates,
  xaxis: {
    type: 'category',
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
  yaxis: {
    opposite: false,
    min: 0,
    max: 100,
    labels: {
      formatter: function (val: number) {
        return val.toFixed(0)
      },
      style: {
        colors: '#6b7280',
      },
    },
    title: {
      text: 'NPS Score',
      style: {
        color: '#374151',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
  },
  legend: {
    horizontalAlign: 'left',
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100],
      colorStops: [
        {
          offset: 0,
          color: '#22c55e',
          opacity: 0.7
        },
        {
          offset: 100,
          color: '#22c55e',
          opacity: 0.3
        }
      ]
    },
  },
  annotations: {
    yaxis: [
      {
        y: 50,
        borderColor: '#f59e0b',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Good NPS Threshold (50+)',
          style: {
            color: '#fff',
            background: '#f59e0b',
            fontSize: '12px',
          },
        },
      },
      {
        y: 70,
        borderColor: '#10b981',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Excellent NPS (70+)',
          style: {
            color: '#fff',
            background: '#10b981',
            fontSize: '12px',
          },
        },
      },
    ],
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' NPS Score'
      },
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
      },
    },
  ],
}

// NPS Segmentation Data (Promoters, Passives, Detractors)
const npsSegmentData = {
  promoters: [45, 42, 48, 52, 49, 56, 59, 63, 61, 67, 70, 73, 71, 75, 78, 76, 80, 83, 81, 85],
  passives: [35, 38, 32, 29, 33, 28, 26, 24, 27, 23, 20, 18, 21, 17, 15, 17, 13, 11, 13, 10],
  detractors: [20, 20, 20, 19, 18, 16, 15, 13, 12, 10, 10, 9, 8, 8, 7, 7, 7, 6, 6, 5],
  months: ['Jan 23', 'Feb 23', 'Mar 23', 'Apr 23', 'May 23', 'Jun 23', 'Jul 23', 'Aug 23', 'Sep 23', 'Oct 23', 'Nov 23', 'Dec 23', 'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24']
}

export const spilineChart: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 380,
    type: 'area',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  colors: ['#22c55e', '#f59e0b', '#ef4444'],
  series: [
    {
      name: 'Promoters (9-10)',
      data: npsSegmentData.promoters,
    },
    {
      name: 'Passives (7-8)',
      data: npsSegmentData.passives,
    },
    {
      name: 'Detractors (0-6)',
      data: npsSegmentData.detractors,
    },
  ],
  title: {
    text: 'NPS Segmentation Analysis',
    align: 'left',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Promoters, Passives & Detractors Distribution',
    align: 'left',
    style: {
      fontSize: '14px',
      color: '#6b7280',
    },
  },
  legend: {
    offsetY: 5,
    position: 'top',
    horizontalAlign: 'right',
  },
  xaxis: {
    categories: npsSegmentData.months,
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return val + '%'
      },
      style: {
        colors: '#6b7280',
      },
    },
    title: {
      text: 'Percentage of Respondents',
      style: {
        color: '#374151',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number) {
        return val + '% of respondents'
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.3,
    },
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#e5e7eb',
    strokeDashArray: 3,
    padding: {
      bottom: 5,
    },
  },
}

// Generate NPS time series data
const generateNPSTimeSeries = () => {
  const data = []
  let baseDate = new Date('2023-01-01').getTime()
  let baseScore = 45
  
  for (let i = 0; i < 365; i++) {
    // Add some realistic variation to NPS scores
    const variation = (Math.random() - 0.5) * 8 // ±4 points variation
    const trendIncrease = i * 0.1 // Gradual improvement over time
    const seasonalEffect = Math.sin((i / 365) * 2 * Math.PI) * 3 // Seasonal variation
    
    baseScore = Math.max(0, Math.min(100, baseScore + variation + trendIncrease/30 + seasonalEffect/10))
    data.push([baseDate + (i * 86400000), Math.round(baseScore)])
  }
  return data
}

const npsTimeSeriesData = generateNPSTimeSeries()

export const dateTimeChartOpts: ApexOptions = {
  annotations: {
    yaxis: [
      {
        y: 50,
        borderColor: '#f59e0b',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Good NPS (50+)',
          style: {
            color: '#fff',
            background: '#f59e0b',
            fontSize: '11px',
          },
        },
      },
      {
        y: 70,
        borderColor: '#10b981',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Excellent NPS (70+)',
          style: {
            color: '#fff',
            background: '#10b981',
            fontSize: '11px',
          },
        },
      },
    ],
    xaxis: [
      {
        x: new Date('2023-06-01').getTime(),
        borderColor: '#3b82f6',
        strokeDashArray: 5,
        label: {
          text: 'Product Launch',
          style: {
            color: '#fff',
            background: '#3b82f6',
            fontSize: '11px',
          },
        },
      },
      {
        x: new Date('2023-10-01').getTime(),
        borderColor: '#8b5cf6',
        strokeDashArray: 5,
        label: {
          text: 'Customer Success Initiative',
          style: {
            color: '#fff',
            background: '#8b5cf6',
            fontSize: '11px',
          },
        },
      },
    ],
  },
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  colors: ['#3b82f6'],
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Daily NPS Tracking with Key Events',
    align: 'left',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Interactive Timeline with Business Milestones',
    align: 'left',
    style: {
      fontSize: '14px',
      color: '#6b7280',
    },
  },
  series: [
    {
      name: 'Daily NPS Score',
      data: npsTimeSeriesData
    }
  ],
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'MMM dd'
    }
  },
  yaxis: {
    title: {
      text: 'NPS Score'
    },
    min: -100,
    max: 100
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  },
  colors: ['#3b82f6'],
  grid: {
    borderColor: '#f1f3fa'
  }
}

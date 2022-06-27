import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as ImIcons from 'react-icons/im'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import * as GrIcons from 'react-icons/gr'

export const SidebarData = [
  {
    title: 'Movie',
    path: '/movie',
    icon: <ImIcons.ImBook color="var(--black)" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="var(--black)"/>,
    iconOpened: <RiIcons.RiArrowUpSFill color="var(--black)"/>,

    subNav: [
      {
        title: 'All movie',
        path: '/movie/allmovie',
        icon: <BsIcons.BsBookshelf color="var(--black)"/>,
        cName: 'sub-nav'
      },
      {
        title: 'Add new movie',
        path: '/movie/newMovie',
        icon: <GrIcons.GrChapterAdd color="var(--black)"/>,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Category',
    path: '/category',
    icon: <BiIcons.BiCategory color="var(--black)"/>,
    iconClosed: <RiIcons.RiArrowDownSFill color="var(--black)"/>,
    iconOpened: <RiIcons.RiArrowUpSFill color="var(--black)"/>,
    subNav: [
      {
        title: 'All category',
        path: '/category/allCategory',
        icon: <IoIcons.IoIosPaper color="var(--black)"/>,
        cName: 'sub-nav'
      },
    ]
  }
];
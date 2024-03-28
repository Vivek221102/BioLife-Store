-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2024 at 10:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biolife`
--

-- --------------------------------------------------------

--
-- Table structure for table `contectus`
--

CREATE TABLE `contectus` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `ph_no` int(11) NOT NULL,
  `msg` varchar(500) NOT NULL,
  `Timing` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem_tbl`
--

CREATE TABLE `orderitem_tbl` (
  `oreder_id` int(20) NOT NULL,
  `book_id` int(10) NOT NULL,
  `user_id` int(50) NOT NULL,
  `pdt_id` int(50) NOT NULL,
  `qty` int(20) NOT NULL,
  `prc` varchar(1000) NOT NULL DEFAULT '0',
  `used_reward` int(10) NOT NULL,
  `when_oredered` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(11) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitem_tbl`
--

INSERT INTO `orderitem_tbl` (`oreder_id`, `book_id`, `user_id`, `pdt_id`, `qty`, `prc`, `used_reward`, `when_oredered`, `status`) VALUES
(1, 269363, 1, 2, 3, '0', 0, '2024-02-28 05:14:56', 'Approve'),
(5, 601165, 1, 1, 3, '2000', 0, '2024-03-20 21:09:14', 'pending'),
(6, 601165, 1, 3, 1, '2000', 0, '2024-03-20 21:09:14', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_addtocart`
--

CREATE TABLE `tbl_addtocart` (
  `cart_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `product_id` int(20) NOT NULL,
  `quantity` int(20) NOT NULL DEFAULT 1,
  `when_added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `when_updated` datetime DEFAULT NULL,
  `status` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin_login`
--

CREATE TABLE `tbl_admin_login` (
  `name` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin_login`
--

INSERT INTO `tbl_admin_login` (`name`, `email`, `pass`) VALUES
('admin', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chatbot`
--

CREATE TABLE `tbl_chatbot` (
  `id` int(5) NOT NULL,
  `question` varchar(500) NOT NULL,
  `ans` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_chatbot`
--

INSERT INTO `tbl_chatbot` (`id`, `question`, `ans`) VALUES
(1, 'hello,hii..!!', 'hello, How can i assist you..?'),
(2, 'explain me how i purchase product? how can i buy product? how to ordered product?,how to purchase product?', 'okay.. so firstly you goto product section in our main module after you for show details of procuct you must to \"LOG IN\" to out website other wise you can not oredered. after add product into cart and after that you can checkout and do payment after your order is done... '),
(3, 'how to forget/forgot password in biolife', 'for this you goto forget password page form where you add registered email and your passward sended by biolife on your mail.. '),
(4, 'how to gain/earn/buy/sell rewards in/form use my wallet/account in biolife??,how to get reward?  how to make rewards?', 'firstly,do for earning amazing rewards you must to buy our products and after whenever you get back return waste form that product to seller that time seller send reward to your account or wallet after that you can use reward for when purchase product next time...    '),
(5, 'nice server, good assist, thank you,great job.', 'thank you sir/madam, any time any query have you about store feel free to ask and thanks for support biolife..'),
(6, 'what is your work? who are you how you assist me ? ', 'hello i\'m biostore assistent i\'m do help of your to resolve queries regarding this store like how to make reward , purchase it, how to use this website, etc...');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_productcategory`
--

CREATE TABLE `tbl_productcategory` (
  `id` int(20) NOT NULL,
  `cat_name` varchar(50) NOT NULL,
  `cat_desc` varchar(500) NOT NULL,
  `when_add_category` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_productcategory`
--

INSERT INTO `tbl_productcategory` (`id`, `cat_name`, `cat_desc`, `when_add_category`) VALUES
(3, 'Organic Products', 'Environmentally friendly and organic products that promote sustainable living.\nExample Products: Organic food, organic skincare, eco-friendly cleaning products.', '2024-02-04 14:45:41'),
(5, 'Personal Care', 'Products dedicated to personal hygiene and care.\nExample Products:\nFacewash, Scrub, Body wash, Shampoo, Moisturizers', '2024-02-04 14:48:56'),
(6, 'Snacks', 'A variety of delicious and convenient snacks for different preferences.\nExample Products:\nChips\nWafers\nPopcorn\nPretzels\nCrackers\nFacewash, Scrub, Body wash, Shampoo, Moisturizers', '2024-02-04 14:51:05'),
(7, 'vegetables and fruits ', 'all tipes of vegetable like cabbege, brinjal, patetos and fruits like apple,banaba ,etc', '2024-02-04 15:03:48'),
(8, 'Drinks', 'fdsreffewwd', '2024-02-25 00:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_productdetail`
--

CREATE TABLE `tbl_productdetail` (
  `p_id` int(11) NOT NULL,
  `p_name` varchar(50) NOT NULL,
  `p_uni_code` int(20) NOT NULL,
  `p_category` int(20) NOT NULL,
  `cat_name` varchar(30) NOT NULL,
  `p_img` varchar(50) NOT NULL,
  `p_price` float NOT NULL,
  `p_ret_price` float NOT NULL,
  `p_desc` varchar(500) NOT NULL,
  `when_add_item` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_productdetail`
--

INSERT INTO `tbl_productdetail` (`p_id`, `p_name`, `p_uni_code`, `p_category`, `cat_name`, `p_img`, `p_price`, `p_ret_price`, `p_desc`, `when_add_item`) VALUES
(1, 'berry Almondmilk(500 ml)', 496351, 3, '', '1708896951724-.jpg', 500, 20, 'this is healthy and fat free product', '2024-02-25 21:35:51'),
(2, 'Garnierman Sunskin Active', 365579, 5, '', '1707800530508-.png', 50, 5, 'This product will be protect out skin to light of sun and give face hydrate ', '2024-02-25 21:42:54'),
(3, 'Dried Appricots', 142281, 3, '', '1708897853638-.jpg', 500, 15, 'This Product is benfetial and healthy', '2024-02-25 21:50:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_registration`
--

CREATE TABLE `tbl_registration` (
  `user_id` int(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `mail_id` varchar(50) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `when_registered` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'Unblock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_registration`
--

INSERT INTO `tbl_registration` (`user_id`, `first_name`, `last_name`, `mail_id`, `pass`, `mobile`, `address`, `when_registered`, `status`) VALUES
(1, 'Vivek', 'Parmar', 'vp22112002@gmail.com', '123', '9313231486', 'KOYALI,391330,VADODARA,GUJARAT', '2024-02-04 08:46:39', 'Unblock'),
(7, 'harshil', 'parmar', 'harshil@gmail.com', 'hp#12260', '9875069578', 'koyali vadodara', '2024-02-12 14:18:16', 'Unblock'),
(8, 'Vivek', 'Parmar', 'vsp22112002@gmail.com', 'w2we2@wdw', '9313231486', 'VADODARA,GUJARAT', '2024-02-29 20:10:39', 'Unblock'),
(9, 's', 's', 'shh@gmsil.com', ',dl,dwd wd@112', '9876543456', 'ddd', '2024-03-04 17:43:54', 'Unblock');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_review`
--

CREATE TABLE `tbl_review` (
  `review_id` int(5) NOT NULL,
  `pdt_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `mail_id` varchar(30) NOT NULL,
  `rating` int(5) NOT NULL,
  `review_msg` varchar(500) NOT NULL,
  `response` varchar(300) DEFAULT NULL,
  `Atsubmit` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_review`
--

INSERT INTO `tbl_review` (`review_id`, `pdt_id`, `user_id`, `user_name`, `mail_id`, `rating`, `review_msg`, `response`, `Atsubmit`) VALUES
(1, 2, 1, 'vivek', 'vp22112002@gmail.com', 5, '“I had an amazing experience with this company. The customer service was outstanding, and the product was exactly what I was looking for.” “I was so pleased with the service I received from this business. They went above and beyond to help me find the perfect item.”', 'thank you for your support we give our best to happy consumers...', '2024-03-20 19:53:45'),
(5, 1, 7, 'harshil', 'harshil@gmail.com', 3, '“I had an amazing experience with this company. The customer service was outstanding, and the product was exactly what I was looking for.” “I was so pleased with the service I received from this business. They went above and beyond to help me find the perfect item.”', NULL, '2024-03-20 20:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rewards`
--

CREATE TABLE `tbl_rewards` (
  `reward_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `pdt_id` int(20) NOT NULL,
  `order_id` int(20) NOT NULL,
  `qty` int(20) NOT NULL,
  `return_price` int(50) NOT NULL,
  `total_amount` int(50) NOT NULL DEFAULT 0,
  `status` varchar(10) NOT NULL DEFAULT 'unused',
  `when_get_reward` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_rewards`
--

INSERT INTO `tbl_rewards` (`reward_id`, `user_id`, `pdt_id`, `order_id`, `qty`, `return_price`, `total_amount`, `status`, `when_get_reward`) VALUES
(1, 1, 894487, 941396, 3, 20, 5, 'used', '2024-02-08 00:32:06'),
(2, 1, 365579, 269363, 2, 5, 10, 'unused', '2024-03-21 02:21:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wishlist`
--

CREATE TABLE `tbl_wishlist` (
  `wish_id` int(20) NOT NULL,
  `user_id` int(50) NOT NULL,
  `pdt_id` int(50) NOT NULL,
  `when_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'wish added'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contectus`
--
ALTER TABLE `contectus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitem_tbl`
--
ALTER TABLE `orderitem_tbl`
  ADD PRIMARY KEY (`oreder_id`);

--
-- Indexes for table `tbl_addtocart`
--
ALTER TABLE `tbl_addtocart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `tbl_chatbot`
--
ALTER TABLE `tbl_chatbot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_productcategory`
--
ALTER TABLE `tbl_productcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_productdetail`
--
ALTER TABLE `tbl_productdetail`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `tbl_registration`
--
ALTER TABLE `tbl_registration`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_review`
--
ALTER TABLE `tbl_review`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `tbl_rewards`
--
ALTER TABLE `tbl_rewards`
  ADD PRIMARY KEY (`reward_id`);

--
-- Indexes for table `tbl_wishlist`
--
ALTER TABLE `tbl_wishlist`
  ADD PRIMARY KEY (`wish_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contectus`
--
ALTER TABLE `contectus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orderitem_tbl`
--
ALTER TABLE `orderitem_tbl`
  MODIFY `oreder_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_addtocart`
--
ALTER TABLE `tbl_addtocart`
  MODIFY `cart_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `tbl_chatbot`
--
ALTER TABLE `tbl_chatbot`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_productcategory`
--
ALTER TABLE `tbl_productcategory`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_productdetail`
--
ALTER TABLE `tbl_productdetail`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_registration`
--
ALTER TABLE `tbl_registration`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_review`
--
ALTER TABLE `tbl_review`
  MODIFY `review_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_rewards`
--
ALTER TABLE `tbl_rewards`
  MODIFY `reward_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_wishlist`
--
ALTER TABLE `tbl_wishlist`
  MODIFY `wish_id` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

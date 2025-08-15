--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    "cartId" integer NOT NULL,
    "fruitId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CartItem_id_seq" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cart_id_seq" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Favorite" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "fruitId" integer NOT NULL
);


ALTER TABLE public."Favorite" OWNER TO postgres;

--
-- Name: Favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Favorite_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Favorite_id_seq" OWNER TO postgres;

--
-- Name: Favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Favorite_id_seq" OWNED BY public."Favorite".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "fruitId" integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO postgres;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    "refreshToken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    birthday timestamp(3) without time zone,
    gender text,
    "phoneNumber" text,
    "shippingAddress" text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: fruits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fruits (
    id integer NOT NULL,
    name text NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    origin text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.fruits OWNER TO postgres;

--
-- Name: fruits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fruits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fruits_id_seq OWNER TO postgres;

--
-- Name: fruits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fruits_id_seq OWNED BY public.fruits.id;


--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Favorite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite" ALTER COLUMN id SET DEFAULT nextval('public."Favorite_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: fruits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fruits ALTER COLUMN id SET DEFAULT nextval('public.fruits_id_seq'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" (id, "cartId", "fruitId", quantity) FROM stdin;
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Favorite" (id, "userId", "fruitId") FROM stdin;
4	2	7
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", status, "createdAt", "updatedAt") FROM stdin;
2	2	pending	2025-08-15 02:49:01.903	2025-08-15 02:49:01.903
1	2	Cancelled	2025-08-15 02:45:06.692	2025-08-15 02:50:54.529
3	1	pending	2025-08-15 06:42:42.189	2025-08-15 06:42:42.189
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "fruitId", quantity, price) FROM stdin;
1	1	7	6	25.00
2	2	7	6	25.00
3	3	2	5	2.50
4	3	14	5	4.00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, name, role, "refreshToken", "createdAt", "updatedAt", birthday, gender, "phoneNumber", "shippingAddress") FROM stdin;
3	yichien@gmail.com	$2b$10$/d3we.4dCSa5TFjVDXg1euwsgauiQKQl69.2jmhogrIR8gZGD8jd.	Yi Chien	user	$2b$10$wOZo8hc7j5KWQvxEkZm/ZOq.nnOumVfruE/rGAD7coxzBnDIC5wOu	2025-08-13 09:21:49.917	2025-08-13 09:21:50.06	1999-10-11 00:00:00	female	0164129175	1, Jalan indah 25/1, Taman Bukit Indah, 81200 Skudai Johor Bahru, Johor.
2	wenni@gmail.com	$2b$10$Kryk1.hMucWBZ73RmDlAEO6Gobn5FStU9myz.YDfAtSGUTQD82F.W	Wen Ni	user	$2b$10$zVqay4ufEmVHFdaPLth8VOSfhWVGc/6dyemyULJAh6UKutno5ATzC	2025-08-13 03:16:02.763	2025-08-15 02:41:43.233	1999-07-04 00:00:00	female	0162899860	33, Jalan nb 2/1, Taman Nusa Bestari 2
1	yuqi@gmail.com	$2b$10$.RTFG7FMWK7qIhBDI5mFaeB0QImmMVoyxvmWmhCZha17UWqIBZ1Dm	Yu Qi	user	$2b$10$FDqFDYmB7.QHjDo7od2QDuTFGAs92NAX.XcDiIVKAPFNHGSW.ZG06	2025-08-13 03:15:36.904	2025-08-15 06:40:49.355	1999-11-19 00:00:00	female	01127738515	35, Jalan nb 2/1, Taman Nusa Bestari 2
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6a6b9b08-bca5-423f-b8ef-ee53c4b3cd6c	c5c7fe7d0b50356e7a861f679a86260e2f704f6a672e2b5a5d32ac677b81b54c	2025-08-08 09:04:06.038362+00	20250808090406_create_user_table	\N	\N	2025-08-08 09:04:06.033455+00	1
858b9672-17f9-425e-a860-858af02a5295	395f9a313344ed6269e99f1fd071e8f993b31def06dfabfc7c97bede341fb130	2025-08-11 08:37:53.470394+00	20250811083753_add_role_to_user	\N	\N	2025-08-11 08:37:53.466969+00	1
1e13c10d-0574-487e-a4e4-0e03b87fcc40	5a6393b6d83460b8f3f1e9a344897863997ee4063fcc7516be6c307399c03154	2025-08-11 08:46:30.510894+00	20250811084630_user_role	\N	\N	2025-08-11 08:46:30.394684+00	1
b7b1cd11-1272-4a51-bf0c-974d07b0cb63	f034368afb237fefe98b662545cc730f1a5d7e65e6d20ad2cd96e2015a7e1ac4	2025-08-13 02:55:39.974983+00	20250813025539_add_refresh_token_to_user	\N	\N	2025-08-13 02:55:39.748056+00	1
2d19a28b-7c72-4bea-a01f-f4868151874b	0a424ff0ce28c85a956f2539a5d94c9215c6d68e34aaa7b2a834543671a1d0b1	2025-08-13 08:19:50.919396+00	20250813081950_add_user_extra_fields	\N	\N	2025-08-13 08:19:50.915958+00	1
75fb14aa-8bf3-43f7-be94-7399c8ef696c	68f044831d062cbfec72648e370d1c23b78469c285a3ae5f54e3b6076aef2155	2025-08-14 02:09:55.550527+00	20250814020955_add_to_cart_feature	\N	\N	2025-08-14 02:09:55.53937+00	1
894f535d-177b-45c8-aede-d5793111552a	10775feff982e6c73f7c32a87f5460d557e4e777904867edba02892e8330a722	2025-08-15 06:33:42.814593+00	20250815063342_unique_fruit_name	\N	\N	2025-08-15 06:33:42.806156+00	1
\.


--
-- Data for Name: fruits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fruits (id, name, quantity, price, origin, created_at) FROM stdin;
2	Fuji Apple	100	2.50	Japan	2025-08-08 09:44:31.659
4	Blueberry 125g	100	9.90	Peru	2025-08-08 09:48:37.014
5	Driscoll's Strawberry 250g	90	28.00	Australia	2025-08-08 09:49:48.761
6	Zespri Organic Sungold Kiwi 5pcs/pack	190	30.00	Italy	2025-08-08 09:51:42.708
7	Blueberry Premium 200g	200	25.00	South Africa	2025-08-08 09:53:21.725
8	Peeled Pomegranate 150g	100	20.00	India	2025-08-08 09:54:15.767
9	Raspberry 125g	100	23.00	China	2025-08-08 09:55:42.869
10	Cameron Highland Strawberry 250g	100	8.00	Malaysia	2025-08-08 09:56:27.801
11	Honey Jackfruit 400g	80	8.00	Malaysia	2025-08-08 09:57:19.997
12	Lemon	90	2.00	Malaysia	2025-08-08 09:57:41.712
1	Jumbo Hass Avocado	200	12.50	Australia	2025-08-08 09:04:32.879
13	Cherry Tomato	190	6.00	Malaysia	2025-08-12 02:34:55.776
14	Orange	1000	4.00	New Zealand	2025-08-15 03:32:20.194
3	Pear	600	2.00	China	2025-08-08 09:46:34.229
15	Cavendish Banana	100	7.20	Malaysia	2025-08-15 03:53:29.658
\.


--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 7, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 2, true);


--
-- Name: Favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Favorite_id_seq"', 4, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 4, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: fruits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fruits_id_seq', 16, true);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: fruits fruits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fruits
    ADD CONSTRAINT fruits_pkey PRIMARY KEY (id);


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Favorite_userId_fruitId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Favorite_userId_fruitId_key" ON public."Favorite" USING btree ("userId", "fruitId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: fruits_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX fruits_name_key ON public.fruits USING btree (name);


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CartItem CartItem_fruitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES public.fruits(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favorite Favorite_fruitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES public.fruits(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_fruitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES public.fruits(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Modal,
    Backdrop,
    Fade,
} from "@mui/material";

const MainContainer = styled.div`
  background-color: white;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
`;

const MainTitleText = styled.p`
  font-size: 40px;
  text-align: center;
  color: #333;
  margin-bottom: 70px;
  font-weight: bold;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  margin-left: 30px;
`;

const SearchLabel = styled("label")`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const AddProductButton = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 10px;
`;

const ModalContent = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  background-color: #fff;
`;

const CloseButton = styled(Button)`
  position: absolute;
  left: 10px;
  top: -20px;
`;

const TableHeaderCell = styled(TableCell)`
  background-color: #c0c0c0;
  color: #fff;
`;

const SearchResultText = styled.p`
  margin-left: 10px;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 500px;
  overflow-y: auto;
  margin-top: 20px;
`;

const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            category: "헬스",
            name: "헬스 1개월권",
            duration: "1개월",
            sessions: null,
            amount: "150,000원",
            status: "사용중",
        },
        {
            id: 2,
            category: "헬스 새벽",
            name: "헬스 새벽 1개월권",
            duration: "1개월",
            sessions: null,
            amount: "100,000원",
            status: "사용종료",
        },
        {
            id: 3,
            category: "헬스 새벽",
            name: "1:1 PT",
            duration: "1개월",
            sessions: "15회",
            amount: "1,240,000원",
            status: "사용중",
        },
        {
            id: 4,
            category: "PT",
            name: "1:1 PT",
            duration: "1개월",
            sessions: "5회",
            amount: "1,240,000원",
            status: "사용종료",
        },
        {
            id: 5,
            category: "PT",
            name: "시니어 PT 10회",
            duration: "1개월",
            sessions: "20회",
            amount: "800,000원",
            status: "사용중",
        },
        {
            id: 6,
            category: "시니어 PT",
            name: "5:1 그룹필라테스 12회",
            duration: "1개월",
            sessions: "20회",
            amount: "600,000원",
            status: "사용중",
        },
        {
            id: 7,
            category: "그룹 PT",
            name: "5:1 그룹필라테스 12회",
            duration: "1개월",
            sessions: "15회",
            amount: "600,000원원",
            status: "사용중",
        },
        {
            id: 8,
            category: "5:1 그룹필라테스",
            name: "락카 3개월",
            duration: "3개월",
            sessions: null,
            amount: "150,000원",
            status: "사용종료",
        },
        {
            id: 9,
            category: "5:1 그룹필라테스",
            name: "헬스 1개월권",
            duration: "1개월",
            sessions: null,
            amount: "150,000원",
            status: "사용중",
        },
        {
            id: 10,
            category: "락카 3개월",
            name: "헬스 새벽 1개월권",
            duration: "3개월",
            sessions: null,
            amount: "100,000원",
            status: "사용종료",
        },
        {
            id: 11,
            category: "헬스",
            name: "1:1 PT",
            duration: "1개월",
            sessions: "5회",
            amount: "1,240,000원",
            status: "사용중",
        },
        {
            id: 12,
            category: "헬스 새벽",
            name: "시니어 PT 10회",
            duration: "1개월",
            sessions: "20회",
            amount: "800,000원",
            status: "사용중",
        },
        {
            id: 13,
            category: "PT",
            name: "5:1 그룹필라테스 12회",
            duration: "1개월",
            sessions: "15회",
            amount: "600,000원",
            status: "사용중",
        },
        {
            id: 14,
            category: "시니어 PT",
            name: "5:1 그룹 필라테스 12회",
            duration: "1개월",
            sessions: "15회",
            amount: "600,000원",
            status: "사용중",
        },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortCriteria, setSortCriteria] = useState("latest");
    const [statusCriteria, setStatusCriteria] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [newProductData, setNewProductData] = useState({
        category: "",
        name: "",
        duration: "",
        sessions: 0,
        amount: 0,
    });

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleStatusCriteriaChange = (event) => {
        const value = event.target.value;
        setStatusCriteria(value);
    };

    const handleProductClick = (productId) => {
        setSelectedProduct(productId);
    };

    const handleMenuClick = (action, productId) => {

        if (action === "삭제") {
            const productIdToDelete = productId || (products.length > 0 ? products[0].id : null);
            const updatedProducts = products.filter((product) => product.id !== productIdToDelete);
            setProducts(updatedProducts);
            setShowModal(false);
            setSelectedProduct(null);
        } else if (action === "수정") {
            const productToEdit = products.find((product) => product.id === productId);
            setNewProductData(productToEdit);
            setShowModal(true);
        } else if (action === "사용종료") {
            const updatedProducts = products.map((product) =>
                productId ? (product.id === productId ? { ...product, status: "사용종료" } : product) :
                    { ...product, status: "사용종료" }
            );
            setProducts(updatedProducts);
            setSelectedProduct(productId);
        }

    };

    const filteredProducts = products
        .filter((product) => {
            const searchTermMatch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const statusCriteriaMatch =
                statusCriteria === "all" ||
                product.status.toLowerCase() === statusCriteria.toLowerCase();
            return searchTermMatch && statusCriteriaMatch;
        })
        .sort((a, b) => {
            if (sortCriteria === "latest") {
                return b.id - a.id;
            } else {
                return a.id - b.id;
            }
        });

    const handleSortCriteriaChange = (event) => {
        const value = event.target.value;
        setSortCriteria(value);
    };



    const handleAddProductClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setNewProductData({
            category: "",
            name: "",
            duration: "",
            sessions: 0,
            amount: 0,
        });
    };

    const handleAddProductModalSubmit = () => {
        const newProduct = {
            id: products.length + 1,
            category: newProductData.category,
            name: newProductData.name,
            duration: newProductData.duration,
            sessions: newProductData.sessions,
            amount: newProductData.amount,
            status: "사용중",
        };
        setProducts([...products, newProduct]);
        setSelectedProduct(newProduct.id);
        setShowModal(false);
    };

    const handleEditProductClick = (productId) => {
        setSelectedProduct(productId);
        const selectedProductData = products.find((product) => product.id === productId);
        setNewProductData(selectedProductData);
        setShowModal(true);
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleStatusChange = (productId, newStatus) => {
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, status: newStatus } : product
        );
        setProducts(updatedProducts);
    };

    const handleEditProductModalSubmit = () => {
        const updatedProducts = products.map((product) =>
            product.id === selectedProduct
                ? { ...newProductData, status: "사용중" }
                : product
        );
        setProducts(updatedProducts);
        setShowModal(false);
        setSelectedProduct(null);
        setNewProductData({
            category: "",
            name: "",
            duration: "",
            sessions: 0,
            amount: 0,
        });
    };



    return (
        <MainContainer>
            <MainTitleText>상품 관리</MainTitleText>

            <SearchSection>
                <SearchLabel htmlFor="search">검색:</SearchLabel>
                <TextField
                    id="search"
                    label="검색"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{ minWidth: 300 }}
                />
                <TextField
                    select
                    label="정렬 기준"
                    variant="outlined"
                    value={sortCriteria}
                    onChange={handleSortCriteriaChange}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="latest">최신 등록순</MenuItem>
                    <MenuItem value="oldest">오래된 순</MenuItem>
                </TextField>
                <TextField
                    select
                    label="상태"
                    variant="outlined"
                    value={statusCriteria}
                    onChange={handleStatusCriteriaChange}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="all">전체</MenuItem>
                    <MenuItem value="사용중">사용중</MenuItem>
                    <MenuItem value="사용종료">사용종료</MenuItem>
                </TextField>
            </SearchSection>

            <SearchResultText>
                총 {filteredProducts.length}개의 결과가 검색되었습니다.
            </SearchResultText>

            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>No</TableHeaderCell>
                            <TableHeaderCell>회원권 카테고리</TableHeaderCell>
                            <TableHeaderCell>회원권명</TableHeaderCell>
                            <TableHeaderCell>사용기간</TableHeaderCell>
                            <TableHeaderCell>세션</TableHeaderCell>
                            <TableHeaderCell>금액</TableHeaderCell>
                            <TableHeaderCell>상태</TableHeaderCell>
                            <TableHeaderCell>메뉴</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell onClick={() => handleProductClick(product.id)}>
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.duration}</TableCell>
                                <TableCell>{product.sessions}</TableCell>
                                <TableCell>{product.amount}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <ActionButtons>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            onClick={() => handleStatusChange(product.id, "사용종료")}
                                        >
                                            사용종료
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            onClick={() => handleEditProductClick(product.id)}
                                        >
                                            수정
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            삭제
                                        </Button>
                                    </ActionButtons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <AddProductButton>
                <Button variant="contained" onClick={handleAddProductClick}>
                    상품 추가
                </Button>
            </AddProductButton>

            <Modal
                open={showModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Fade in={showModal}>
                    <ModalContent>
                        <CloseButton onClick={handleModalClose} variant="text" color="info">
                            X
                        </CloseButton>
                        <h2>{selectedProduct ? "상품 수정" : "상품 추가"}</h2>
                        <TextField
                            label="카테고리"
                            variant="outlined"
                            value={newProductData.category}
                            onChange={(e) =>
                                setNewProductData({ ...newProductData, category: e.target.value })
                            }
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="상품명"
                            variant="outlined"
                            value={newProductData.name}
                            onChange={(e) =>
                                setNewProductData({ ...newProductData, name: e.target.value })
                            }
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="사용기간"
                            variant="outlined"
                            value={newProductData.duration}
                            onChange={(e) =>
                                setNewProductData({ ...newProductData, duration: e.target.value })
                            }
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="세션"
                            variant="outlined"
                            type="number"
                            value={newProductData.sessions}
                            onChange={(e) =>
                                setNewProductData({ ...newProductData, sessions: e.target.value })
                            }
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="금액"
                            variant="outlined"
                            type="number"
                            value={newProductData.amount}
                            onChange={(e) =>
                                setNewProductData({ ...newProductData, amount: e.target.value })
                            }
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={
                                selectedProduct
                                    ? handleEditProductModalSubmit
                                    : handleAddProductModalSubmit
                            }
                        >
                            {selectedProduct ? "수정" : "추가"}
                        </Button>
                    </ModalContent>
                </Fade>
            </Modal>
        </MainContainer>
    );
};

export default Products;


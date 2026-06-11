package com.autowash.service;

import com.autowash.dto.response.BookingResponse;
import com.autowash.dto.response.BookingStatusResponse;
import com.autowash.dto.response.TopUsedVoucherResponse;
import com.autowash.entity.Booking;
import com.autowash.enums.BookingStatus;
import com.autowash.repository.BookingRepository;
import com.autowash.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final BookingRepository bookingRepo;
    private final PaymentRepository paymentRepo;

    public List<TopUsedVoucherResponse> getTopVoucher() {
        return paymentRepo.findTopUsedVoucher();
    }
    //cái này gọi xún lớp repo có câu query lấy ra hoi
    public List<BookingStatusResponse> countBookingByStatus(){
        return bookingRepo.countBookingsByStatus();
    }
    //hàm lấy được danh sách các lớp booking (có thể theo bộ lọc status hoặc không)
    public List<BookingResponse> getBookingListByStatus(BookingStatus status){
        List<Booking> bookingList = bookingRepo.findBookingsByStatus(status);
        return bookingList.stream().map(this::mapToBooingResponse).toList();
    }

    public BookingResponse mapToBooingResponse(Booking booking) {
        List<String> serviceList = booking.getBookingDetails().stream().map(bookingDetail -> bookingDetail.getServicePrice() != null
                && bookingDetail.getServicePrice().getService() != null ?
                bookingDetail.getServicePrice().getService().getName() : "").toList();
        String payMethod = null;
        String payStatus = null;
        Integer totalPrice = 0;
        if (booking.getPayment() != null) {
            payMethod = booking.getPayment().getPaymentMethod() != null ?
                    booking.getPayment().getPaymentMethod().name() : null;
            payStatus = booking.getPayment().getPaymentStatus() != null ?
                    booking.getPayment().getPaymentStatus().name() : null;
            totalPrice = booking.getPayment().getFinalPrice();
        } else {
            totalPrice = booking.getBookingDetails().stream().mapToInt(bookingDetail -> bookingDetail.getActualPrice() != null ?
                    bookingDetail.getActualPrice() : 0).sum();
        }

        return new BookingResponse(
            booking.getId(),
            booking.getBookingCode(),
            booking.getUser() != null ? booking.getUser().getFullName() : null,
            booking.getUser() != null ? booking.getUser().getPhone() : null,
            booking.getUser() != null ? booking.getVehicle().getLicensePlate() : null,
            booking.getScheduledStartTime(),
            booking.getStatus(),
            serviceList,
            payMethod,
            payStatus,
            totalPrice
        );

    }
}

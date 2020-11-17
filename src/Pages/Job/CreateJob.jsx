import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { Button, Card, Form, Grid } from "semantic-ui-react";

function Job(jobModel) {
  const dispatch = useDispatch();
  const rules = [
    "Bir vakansiyanın 30 gün müddətinə yerləşdirilməsi pulsuz həyata keçirilir.",
    "Vakansiya yalnız Azərbaycan daxilində olan işləri əhatə etməlidir.",
    "Vakansiya haqqında elanın ən qısa müddətdə dərc olunması üçün formanın doldurulmasına dair bütün təlimatlara ciddi riayət olunmalıdır. Səliqəsiz doldurulmuş formalar redaktəyə məruz qalacaq və dərhal dərc olunmayacaq.",
    "Elanların yalnız baş (BÖYÜK) hərflərlə və ya başqa əlifba ilə (translitlə) yazılması qadağandır. Elan bütünlüklə bir dildə olmalıdır.",
    "Şirkətin adı olan sütunda şirkətin rəsmi, hüquqi adı, həmin müəssisə holdinq tərkibindədirsə, holdinqin adı və şirkətin fəaliyyət istiqaməti (növü) qeyd olunmalıdır.",
    "Əlaqələr yazılan sütunda aktiv şəhər telefonlarının nömrələri və şirkətin korporativ elektron ünvanları qeyd olunmalıdır.",
    "İstifadəçi 5 və 6-cı bəndlərə riayət etmədikdə, elan ödənişli əsaslarla qəbul edilir.",
    "Tibb müəssisələrinin elanları və ya tibbi tərkibli, alış-veriş haqqında, o cümlədən saytda onlayn-satışlı elanlar pulludur.",
    "«Əmək haqqı» sütununun doldurulması mütləqdir, məbləğ AZN-lə göstərilməlidir. Əgər əmək haqqı 500 AZN-ə qədərdirsə, əmək haqqı diapazonu 200 AZN-i; 1000 AZN-ə qədərdirsə 300 AZN-i; 2000 AZN-ə qədərdirsə, 500 AZN-i aşmamalıdır.",
    "Dərc olunmuş elanda əlaqə nömrələrinin, vakansiyanın adının dəyişdirilməsi qadağandır.",
    "«Namizədə olan tələblər» mümkün qədər ətraflı yazılmalıdır.",
    "«Mövqenin (vəzifənin) təsviri» də həmçinin iş qrafiki, vəzifə öhdəlikləri və işin şərtləri qeyd olunmaqla, ətraflı yazılmalıdır.",
    "Mövqe (vəzifə) seçilmiş kateqoriyaya uyğun olmalı, əgər elə kateqoriya yoxdursa, onda «Müxtəlif» adlanan alt-kateqoriyada yerləşdirilməlidir.",
    "Aşağıdakı kimi elanlar dərhal ləğv olunacaq: •ədəbsiz, təhqiredici sözlər və ifadələr olan; •şəbəkə marketinqi və ya qadağan olunmuş, şübhəli fəaliyyət növləri ilə məşğul olan şirkətlərdə iştirak təklifləri olan.",
  ];

  return (
    // <Grid>
    //   <Grid.Row>
    //     <Grid.Column width={8}>
    //       <Card>
    //         <Form>
    //           <Form.Group>
    //             <Form.Input label="email" placeholder="Email" />
    //             <Form.Input label="phoneNumber" placeholder="Telefon" />
    //           </Form.Group>

    //           <Form.Checkbox label="I agree to the Terms and Conditions" />
    //           <Button type="submit">Submit</Button>
    //         </Form>
    //       </Card>
    //     </Grid.Column>
    //     <Grid.Column width={8}>
    //       <Grid.Row>
    //         <h1 style={{ textAlign: "center", padding: "20px" }}>Qaydalar</h1>
    //       </Grid.Row>
    //       <Grid.Row>
    //         {rules.map((rule, j, { i = 1 }) => (
    //           <h4>
    //             {(j = i + j++)} - {rule}
    //           </h4>
    //         ))}
    //       </Grid.Row>
    //     </Grid.Column>
    //   </Grid.Row>
    // </Grid>

    <Container>
      <Leftside>
        <div>
          <div className="header-text">
            <strong>Əlaqə</strong>
          </div>
          <strong>Email</strong>
          <input
            type="email"
            style={{ borderRadius: "5px", marginLeft: "10px" }}
          ></input>
        </div>
        <div>
          <strong style={{ marginTop: "20px" }}>Telefon</strong>
          <input
            type="phone"
            style={{ borderRadius: "5px", marginLeft: "10px" }}
          ></input>
        </div>
      </Leftside>
      <Rightside>
        {rules.map((rule, j, { i = 1 }) => (
          <h4>
            {(j = i + j++)} - {rule}
          </h4>
        ))}
      </Rightside>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

const Leftside = styled.div`
  flex: 1;

  & > .header-text {
    margin-bottom: 20px;
    color: #eab121;
    font-size: 26px;
  }
`;

const Rightside = styled.div`
  flex: 1;
`;

Job.defaultProps = {};

export default Job;
